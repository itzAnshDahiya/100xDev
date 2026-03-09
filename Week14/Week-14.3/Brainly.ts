// Brainly jaise platform ka simplified in-memory TypeScript backend model
// Note: Real Brainly me distributed systems, DB, search engine, anti-spam, ML moderation etc. hote hain.
// Yahan hum core product features ko interview/learning style me implement kar rahe hain.

type ID = string;

type Role = "student" | "teacher" | "moderator" | "admin";
type Subject =
	| "Math"
	| "Science"
	| "English"
	| "History"
	| "Computer"
	| "Other";
type VoteType = "upvote" | "downvote";
type ReportReason = "spam" | "abuse" | "wrong-answer" | "copyright" | "other";

interface User {
	id: ID;
	name: string;
	email: string;
	password: string;
	role: Role;
	points: number;
	followers: Set<ID>;
	following: Set<ID>;
	bookmarks: Set<ID>; // questionIds
	notifications: Notification[];
}

interface Question {
	id: ID;
	authorId: ID;
	title: string;
	body: string;
	subject: Subject;
	tags: string[];
	attachments: string[];
	answerIds: ID[];
	followers: Set<ID>;
	isSolved: boolean;
	bestAnswerId?: ID;
	createdAt: Date;
}

interface Answer {
	id: ID;
	questionId: ID;
	authorId: ID;
	body: string;
	attachments: string[];
	upvotes: Set<ID>;
	downvotes: Set<ID>;
	commentIds: ID[];
	isBestAnswer: boolean;
	createdAt: Date;
}

interface Comment {
	id: ID;
	answerId: ID;
	authorId: ID;
	body: string;
	createdAt: Date;
}

interface Notification {
	id: ID;
	userId: ID;
	message: string;
	isRead: boolean;
	createdAt: Date;
}

interface Report {
	id: ID;
	reporterId: ID;
	targetType: "question" | "answer" | "comment";
	targetId: ID;
	reason: ReportReason;
	details: string;
	status: "open" | "resolved" | "dismissed";
	createdAt: Date;
}

interface Message {
	id: ID;
	fromUserId: ID;
	toUserId: ID;
	text: string;
	createdAt: Date;
}

class BrainlyPlatform {
	// In-memory stores: production me ye DB tables/collections hote hain
	private users = new Map<ID, User>();
	private questions = new Map<ID, Question>();
	private answers = new Map<ID, Answer>();
	private comments = new Map<ID, Comment>();
	private reports = new Map<ID, Report>();
	private messages = new Map<ID, Message[]>(); // key = sorted pair "u1|u2"

	private currentUserId: ID | null = null;
	private idCounter = 1;

	// Helper: unique ID generate karne ke liye
	private genId(prefix: string): ID {
		return `${prefix}_${this.idCounter++}`;
	}

	private requireAuth(): User {
		if (!this.currentUserId) {
			throw new Error("Login required");
		}
		const user = this.users.get(this.currentUserId);
		if (!user) {
			throw new Error("Current user not found");
		}
		return user;
	}

	private notify(userId: ID, message: string): void {
		const user = this.users.get(userId);
		if (!user) return;
		user.notifications.unshift({
			id: this.genId("notif"),
			userId,
			message,
			isRead: false,
			createdAt: new Date(),
		});
	}

	private awardPoints(userId: ID, delta: number): void {
		const user = this.users.get(userId);
		if (!user) return;
		user.points = Math.max(0, user.points + delta);
	}

	// User and Auth Features
	register(name: string, email: string, password: string, role: Role = "student"): User {
		const alreadyExists = Array.from(this.users.values()).some((u) => u.email === email);
		if (alreadyExists) {
			throw new Error("Email already registered");
		}

		const user: User = {
			id: this.genId("user"),
			name,
			email,
			password,
			role,
			points: 0,
			followers: new Set(),
			following: new Set(),
			bookmarks: new Set(),
			notifications: [],
		};

		this.users.set(user.id, user);
		return user;
	}

	login(email: string, password: string): string {
		const user = Array.from(this.users.values()).find((u) => u.email === email && u.password === password);
		if (!user) {
			throw new Error("Invalid credentials");
		}
		this.currentUserId = user.id;

		// Real app me JWT/session token issue hota hai.
		return `token_${user.id}_${Date.now()}`;
	}

	logout(): void {
		this.currentUserId = null;
	}

	followUser(targetUserId: ID): void {
		const me = this.requireAuth();
		if (me.id === targetUserId) return;
		const target = this.users.get(targetUserId);
		if (!target) throw new Error("User not found");

		me.following.add(targetUserId);
		target.followers.add(me.id);
		this.notify(targetUserId, `${me.name} started following you`);
	}

	// QnA Features
	postQuestion(input: {
		title: string;
		body: string;
		subject: Subject;
		tags?: string[];
		attachments?: string[];
	}): Question {
		const me = this.requireAuth();
		const question: Question = {
			id: this.genId("q"),
			authorId: me.id,
			title: input.title,
			body: input.body,
			subject: input.subject,
			tags: input.tags ?? [],
			attachments: input.attachments ?? [],
			answerIds: [],
			followers: new Set([me.id]),
			isSolved: false,
			createdAt: new Date(),
		};
		this.questions.set(question.id, question);
		this.awardPoints(me.id, 5); // question poochne par base points
		return question;
	}

	answerQuestion(questionId: ID, body: string, attachments: string[] = []): Answer {
		const me = this.requireAuth();
		const question = this.questions.get(questionId);
		if (!question) throw new Error("Question not found");

		const answer: Answer = {
			id: this.genId("a"),
			questionId,
			authorId: me.id,
			body,
			attachments,
			upvotes: new Set(),
			downvotes: new Set(),
			commentIds: [],
			isBestAnswer: false,
			createdAt: new Date(),
		};

		this.answers.set(answer.id, answer);
		question.answerIds.push(answer.id);
		this.awardPoints(me.id, 10);

		this.notify(question.authorId, `${me.name} answered your question: ${question.title}`);
		question.followers.forEach((uid) => {
			if (uid !== question.authorId && uid !== me.id) {
				this.notify(uid, `New answer on question: ${question.title}`);
			}
		});

		return answer;
	}

	commentOnAnswer(answerId: ID, body: string): Comment {
		const me = this.requireAuth();
		const answer = this.answers.get(answerId);
		if (!answer) throw new Error("Answer not found");

		const comment: Comment = {
			id: this.genId("c"),
			answerId,
			authorId: me.id,
			body,
			createdAt: new Date(),
		};

		this.comments.set(comment.id, comment);
		answer.commentIds.push(comment.id);

		this.notify(answer.authorId, `${me.name} commented on your answer`);
		return comment;
	}

	voteAnswer(answerId: ID, vote: VoteType): void {
		const me = this.requireAuth();
		const answer = this.answers.get(answerId);
		if (!answer) throw new Error("Answer not found");

		// Ek user ka single active vote: upvote ya downvote
		answer.upvotes.delete(me.id);
		answer.downvotes.delete(me.id);

		if (vote === "upvote") {
			answer.upvotes.add(me.id);
			this.awardPoints(answer.authorId, 2);
			this.notify(answer.authorId, "Your answer got an upvote");
		} else {
			answer.downvotes.add(me.id);
			this.awardPoints(answer.authorId, -1);
			this.notify(answer.authorId, "Your answer got a downvote");
		}
	}

	markBestAnswer(questionId: ID, answerId: ID): void {
		const me = this.requireAuth();
		const question = this.questions.get(questionId);
		if (!question) throw new Error("Question not found");
		if (question.authorId !== me.id) throw new Error("Only question owner can mark best answer");

		const answer = this.answers.get(answerId);
		if (!answer || answer.questionId !== questionId) {
			throw new Error("Invalid answer for this question");
		}

		question.answerIds.forEach((aid) => {
			const a = this.answers.get(aid);
			if (a) a.isBestAnswer = false;
		});

		answer.isBestAnswer = true;
		question.isSolved = true;
		question.bestAnswerId = answer.id;

		this.awardPoints(answer.authorId, 15);
		this.notify(answer.authorId, "Congrats! Your answer was marked as best answer");
	}

	followQuestion(questionId: ID): void {
		const me = this.requireAuth();
		const question = this.questions.get(questionId);
		if (!question) throw new Error("Question not found");
		question.followers.add(me.id);
	}

	bookmarkQuestion(questionId: ID): void {
		const me = this.requireAuth();
		if (!this.questions.has(questionId)) throw new Error("Question not found");
		me.bookmarks.add(questionId);
	}

	// Discovery Features
	searchQuestions(query: string): Question[] {
		const q = query.toLowerCase().trim();
		return Array.from(this.questions.values()).filter((question) => {
			const inTitle = question.title.toLowerCase().includes(q);
			const inBody = question.body.toLowerCase().includes(q);
			const inTags = question.tags.some((tag) => tag.toLowerCase().includes(q));
			return inTitle || inBody || inTags;
		});
	}

	getFeed(subject?: Subject): Question[] {
		// Feed me newest pehle: real app me personalized ranking hoti hai
		return Array.from(this.questions.values())
			.filter((q) => (subject ? q.subject === subject : true))
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
	}

	// Messaging Feature
	sendMessage(toUserId: ID, text: string): Message {
		const me = this.requireAuth();
		if (!this.users.has(toUserId)) throw new Error("Recipient not found");

		const message: Message = {
			id: this.genId("msg"),
			fromUserId: me.id,
			toUserId,
			text,
			createdAt: new Date(),
		};

		const key = [me.id, toUserId].sort().join("|");
		const thread = this.messages.get(key) ?? [];
		thread.push(message);
		this.messages.set(key, thread);

		this.notify(toUserId, `${me.name} sent you a message`);
		return message;
	}

	getThread(withUserId: ID): Message[] {
		const me = this.requireAuth();
		const key = [me.id, withUserId].sort().join("|");
		return this.messages.get(key) ?? [];
	}

	// Moderation Feature
	reportContent(targetType: "question" | "answer" | "comment", targetId: ID, reason: ReportReason, details = ""): Report {
		const me = this.requireAuth();

		const targetExists =
			(targetType === "question" && this.questions.has(targetId)) ||
			(targetType === "answer" && this.answers.has(targetId)) ||
			(targetType === "comment" && this.comments.has(targetId));

		if (!targetExists) throw new Error("Target content not found");

		const report: Report = {
			id: this.genId("rep"),
			reporterId: me.id,
			targetType,
			targetId,
			reason,
			details,
			status: "open",
			createdAt: new Date(),
		};

		this.reports.set(report.id, report);
		return report;
	}

	moderateReport(reportId: ID, action: "resolve" | "dismiss"): void {
		const me = this.requireAuth();
		if (me.role !== "moderator" && me.role !== "admin") {
			throw new Error("Only moderator/admin can moderate reports");
		}

		const report = this.reports.get(reportId);
		if (!report) throw new Error("Report not found");

		report.status = action === "resolve" ? "resolved" : "dismissed";
	}

	// Profile and Notification
	getLeaderboard(limit = 10): User[] {
		return Array.from(this.users.values())
			.sort((a, b) => b.points - a.points)
			.slice(0, limit);
	}

	getNotifications(markAsRead = false): Notification[] {
		const me = this.requireAuth();
		if (markAsRead) {
			me.notifications.forEach((n) => {
				n.isRead = true;
			});
		}
		return me.notifications;
	}

	getQuestionWithAnswers(questionId: ID): {
		question: Question;
		answers: Array<Answer & { score: number; comments: Comment[] }>;
	} {
		const question = this.questions.get(questionId);
		if (!question) throw new Error("Question not found");

		const hydratedAnswers = question.answerIds
			.map((aid) => this.answers.get(aid))
			.filter((a): a is Answer => Boolean(a))
			.map((a) => ({
				...a,
				score: a.upvotes.size - a.downvotes.size,
				comments: a.commentIds
					.map((cid) => this.comments.get(cid))
					.filter((c): c is Comment => Boolean(c)),
			}))
			.sort((a, b) => {
				// Best answer top pe, fir score aur recency ke basis pe
				if (a.isBestAnswer && !b.isBestAnswer) return -1;
				if (!a.isBestAnswer && b.isBestAnswer) return 1;
				if (b.score !== a.score) return b.score - a.score;
				return b.createdAt.getTime() - a.createdAt.getTime();
			});

		return { question, answers: hydratedAnswers };
	}
}

// ----------------- Demo Usage -----------------
const app = new BrainlyPlatform();

const userA = app.register("Ansh", "ansh@mail.com", "1234", "student");
const userB = app.register("Riya", "riya@mail.com", "1234", "teacher");
const mod = app.register("Mod", "mod@mail.com", "1234", "moderator");

app.login(userA.email, "1234");
const q1 = app.postQuestion({
	title: "Integration by parts ka short trick?",
	body: "Mujhe formula yaad rehta hai but apply karne me confusion hota hai.",
	subject: "Math",
	tags: ["calculus", "integration"],
});
app.logout();

app.login(userB.email, "1234");
const a1 = app.answerQuestion(q1.id, "LIATE rule use karo: Log, Inverse, Algebraic, Trigonometric, Exponential.");
app.voteAnswer(a1.id, "upvote");
app.logout();

app.login(userA.email, "1234");
app.followQuestion(q1.id);
app.markBestAnswer(q1.id, a1.id);
const details = app.getQuestionWithAnswers(q1.id);
console.log("Question Details:", details.question.title, "Answers:", details.answers.length);
console.log("Leaderboard:", app.getLeaderboard().map((u) => `${u.name}(${u.points})`));
app.logout();

app.login(mod.email, "1234");
const rep = app.reportContent("answer", a1.id, "wrong-answer", "Check if full derivation present.");
app.moderateReport(rep.id, "resolve");

