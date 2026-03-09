export {};

// Chhota aur working Brainly-style model (in-memory)
// Hinglish comments ke saath core features: auth, question, answer, vote, best answer, search, notifications.

type ID = string;
type Subject = "Math" | "Science" | "English" | "History" | "Computer" | "Other";
type VoteType = "upvote" | "downvote";

interface AppNotification {
  id: ID;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

interface User {
  id: ID;
  name: string;
  email: string;
  password: string;
  points: number;
  notifications: AppNotification[];
}

interface Question {
  id: ID;
  authorId: ID;
  title: string;
  body: string;
  subject: Subject;
  tags: string[];
  answerIds: ID[];
  isSolved: boolean;
  bestAnswerId?: ID;
  createdAt: Date;
}

interface Answer {
  id: ID;
  questionId: ID;
  authorId: ID;
  body: string;
  upvotes: Set<ID>;
  downvotes: Set<ID>;
  isBest: boolean;
  createdAt: Date;
}

class BrainlyPlatform {
  private users = new Map<ID, User>();
  private questions = new Map<ID, Question>();
  private answers = new Map<ID, Answer>();
  private currentUserId: ID | null = null;
  private seq = 1;

  // Ye helper unique IDs banata hai
  private nextId(prefix: string): ID {
    return `${prefix}_${this.seq++}`;
  }

  // Har secured method me login check reuse karne ke liye
  private me(): User {
    if (!this.currentUserId) throw new Error("Login required");
    const user = this.users.get(this.currentUserId);
    if (!user) throw new Error("Current user not found");
    return user;
  }

  // Notification push karne ka common method
  private notify(userId: ID, message: string): void {
    const user = this.users.get(userId);
    if (!user) return;
    user.notifications.unshift({
      id: this.nextId("notif"),
      message,
      isRead: false,
      createdAt: new Date(),
    });
  }

  register(name: string, email: string, password: string): User {
    const exists = Array.from(this.users.values()).some((u) => u.email === email);
    if (exists) throw new Error("Email already registered");

    const user: User = {
      id: this.nextId("user"),
      name,
      email,
      password,
      points: 0,
      notifications: [],
    };
    this.users.set(user.id, user);
    return user;
  }

  login(email: string, password: string): void {
    const user = Array.from(this.users.values()).find((u) => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid credentials");
    this.currentUserId = user.id;
  }

  logout(): void {
    this.currentUserId = null;
  }

  postQuestion(title: string, body: string, subject: Subject, tags: string[] = []): Question {
    const user = this.me();
    const question: Question = {
      id: this.nextId("q"),
      authorId: user.id,
      title,
      body,
      subject,
      tags,
      answerIds: [],
      isSolved: false,
      createdAt: new Date(),
    };

    this.questions.set(question.id, question);
    user.points += 5; // Sawaal poochne pe points
    return question;
  }

  answerQuestion(questionId: ID, body: string): Answer {
    const user = this.me();
    const question = this.questions.get(questionId);
    if (!question) throw new Error("Question not found");

    const answer: Answer = {
      id: this.nextId("a"),
      questionId,
      authorId: user.id,
      body,
      upvotes: new Set(),
      downvotes: new Set(),
      isBest: false,
      createdAt: new Date(),
    };

    this.answers.set(answer.id, answer);
    question.answerIds.push(answer.id);
    user.points += 10; // Answer dene pe points
    this.notify(question.authorId, `${user.name} answered your question`);
    return answer;
  }

  voteAnswer(answerId: ID, vote: VoteType): void {
    const user = this.me();
    const answer = this.answers.get(answerId);
    if (!answer) throw new Error("Answer not found");
    if (answer.authorId === user.id) throw new Error("You cannot vote your own answer");

    // Ek user ek hi vote active rakh sakta hai
    answer.upvotes.delete(user.id);
    answer.downvotes.delete(user.id);

    if (vote === "upvote") answer.upvotes.add(user.id);
    else answer.downvotes.add(user.id);
  }

  markBestAnswer(questionId: ID, answerId: ID): void {
    const user = this.me();
    const question = this.questions.get(questionId);
    if (!question) throw new Error("Question not found");
    if (question.authorId !== user.id) throw new Error("Only question owner can mark best answer");

    const answer = this.answers.get(answerId);
    if (!answer || answer.questionId !== questionId) throw new Error("Invalid answer for this question");

    // Purane best ko reset karke naya best set karte hain
    for (const id of question.answerIds) {
      const a = this.answers.get(id);
      if (a) a.isBest = false;
    }

    answer.isBest = true;
    question.isSolved = true;
    question.bestAnswerId = answer.id;

    const winner = this.users.get(answer.authorId);
    if (winner) winner.points += 15;
    this.notify(answer.authorId, "Congrats! Your answer marked as best");
  }

  searchQuestions(query: string): Question[] {
    const q = query.toLowerCase().trim();
    return Array.from(this.questions.values()).filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.body.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }

  getQuestionWithAnswers(questionId: ID): { question: Question; answers: Array<Answer & { score: number }> } {
    const question = this.questions.get(questionId);
    if (!question) throw new Error("Question not found");

    const data = question.answerIds
      .map((id) => this.answers.get(id))
      .filter((a): a is Answer => a !== undefined)
      .map((a) => ({ ...a, score: a.upvotes.size - a.downvotes.size }))
      .sort((a, b) => {
        if (a.isBest && !b.isBest) return -1;
        if (!a.isBest && b.isBest) return 1;
        return b.score - a.score;
      });

    return { question, answers: data };
  }

  getMyNotifications(markAsRead = false): AppNotification[] {
    const user = this.me();
    if (markAsRead) user.notifications.forEach((n) => (n.isRead = true));
    return user.notifications;
  }
}

// Demo run: yahan se quickly samajh aayega flow kaise kaam karta hai
const app = new BrainlyPlatform();
const ansh = app.register("Ansh", "ansh@mail.com", "1234");
const riya = app.register("Riya", "riya@mail.com", "1234");

app.login(ansh.email, "1234");
const q = app.postQuestion(
  "Integration by parts ka trick?",
  "Formula yaad hai but select kaise karu samajh nahi aata",
  "Math",
  ["calculus", "integration"]
);
app.logout();

app.login(riya.email, "1234");
const a = app.answerQuestion(q.id, "LIATE order follow karo, pehle Log fir Inverse etc.");
app.logout();

app.login(ansh.email, "1234");
app.markBestAnswer(q.id, a.id);
const result = app.getQuestionWithAnswers(q.id);
console.log(result.question.title, "=> answers:", result.answers.length);

