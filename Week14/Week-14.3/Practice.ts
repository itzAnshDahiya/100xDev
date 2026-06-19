// X (Twitter)-style backend in TypeScript (in-memory version)
// Example Code

type ID = string;

type Role = "USER" | "ADMIN";

interface User {
	id: ID;
	username: string;
	email: string;
	passwordHash: string;
	bio?: string;
	role: Role;
	createdAt: Date;
}

interface Post {
	id: ID;
	authorId: ID;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	hashtags: string[];
	mentions: string[];
	likeCount: number;
	repostCount: number;
	replyCount: number;
	isDeleted: boolean;
}

interface Reply {
	id: ID;
	postId: ID;
	authorId: ID;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	isDeleted: boolean;
}

interface Follow {
	followerId: ID;
	followingId: ID;
	createdAt: Date;
}

interface Like {
	userId: ID;
	postId: ID;
	createdAt: Date;
}

interface Repost {
	userId: ID;
	postId: ID;
	createdAt: Date;
}

type NotificationType =
	| "FOLLOW"
	| "LIKE"
	| "MENTION"
	| "REPOST"
	| "REPLY"
	| "SYSTEM";

interface AppNotification {
	id: ID;
	userId: ID;
	type: NotificationType;
	message: string;
	createdAt: Date;
	isRead: boolean;
}

interface Session {
	token: string;
	userId: ID;
	createdAt: Date;
	expiresAt: Date;
}

interface PaginationInput {
	page: number;
	pageSize: number;
}

interface PaginatedResult<T> {
	items: T[];
	page: number;
	pageSize: number;
	total: number;
	totalPages: number;
}

class AppError extends Error {
	constructor(
		public readonly code: string,
		message: string,
		public readonly status: number = 400,
	) {
		super(message);
	}
}

class InMemoryDatabase {
	users = new Map<ID, User>();
	posts = new Map<ID, Post>();
	replies = new Map<ID, Reply>();
	follows = new Set<string>();
	likes = new Set<string>();
	reposts = new Set<string>();
	bookmarks = new Set<string>();
	notifications = new Map<ID, AppNotification>();
	sessions = new Map<string, Session>();
}

class IdGenerator {
	private counter = 0;

	next(prefix: string): ID {
		this.counter += 1;
		return `${prefix}_${Date.now()}_${this.counter}`;
	}
}

class CryptoUtil {
	// Demo-only hash helper. Use bcrypt/argon2 in production.
	static hash(password: string): string {
		let hash = 0;
		for (let i = 0; i < password.length; i += 1) {
			hash = (hash << 5) - hash + password.charCodeAt(i);
			hash |= 0;
		}
		return `h_${Math.abs(hash).toString(16)}`;
	}

	static verify(password: string, hashed: string): boolean {
		return this.hash(password) === hashed;
	}
}

class TextParser {
	static extractHashtags(content: string): string[] {
		const matches = content.match(/#[a-zA-Z0-9_]+/g) ?? [];
		return [...new Set(matches.map((tag) => tag.toLowerCase()))];
	}

	static extractMentions(content: string): string[] {
		const matches = content.match(/@[a-zA-Z0-9_]+/g) ?? [];
		return [...new Set(matches.map((name) => name.slice(1).toLowerCase()))];
	}
}

class PaginationUtil {
	static apply<T>(arr: T[], input: PaginationInput): PaginatedResult<T> {
		const page = Math.max(1, input.page);
		const pageSize = Math.min(100, Math.max(1, input.pageSize));
		const total = arr.length;
		const totalPages = Math.max(1, Math.ceil(total / pageSize));
		const start = (page - 1) * pageSize;
		const items = arr.slice(start, start + pageSize);

		return { items, page, pageSize, total, totalPages };
	}
}

class AuthService {
	constructor(
		private readonly db: InMemoryDatabase,
		private readonly idGen: IdGenerator,
	) {}

	register(input: {
		username: string;
		email: string;
		password: string;
		bio?: string;
		role?: Role;
	}): User {
		const username = input.username.trim().toLowerCase();
		const email = input.email.trim().toLowerCase();

		if (!username || !email || input.password.length < 6) {
			throw new AppError("INVALID_INPUT", "Invalid registration details");
		}

		const usernameExists = [...this.db.users.values()].some(
			(u) => u.username === username,
		);
		const emailExists = [...this.db.users.values()].some((u) => u.email === email);

		if (usernameExists) {
			throw new AppError("USERNAME_TAKEN", "Username already taken", 409);
		}
		if (emailExists) {
			throw new AppError("EMAIL_TAKEN", "Email already registered", 409);
		}

		const user: User = {
			id: this.idGen.next("usr"),
			username,
			email,
			passwordHash: CryptoUtil.hash(input.password),
			bio: input.bio,
			role: input.role ?? "USER",
			createdAt: new Date(),
		};

		this.db.users.set(user.id, user);
		return user;
	}

	login(email: string, password: string): Session {
		const normalizedEmail = email.trim().toLowerCase();
		const user = [...this.db.users.values()].find((u) => u.email === normalizedEmail);

		if (!user || !CryptoUtil.verify(password, user.passwordHash)) {
			throw new AppError("INVALID_CREDENTIALS", "Email or password is incorrect", 401);
		}

		const now = new Date();
		const session: Session = {
			token: this.idGen.next("token"),
			userId: user.id,
			createdAt: now,
			expiresAt: new Date(now.getTime() + 1000 * 60 * 60 * 24),
		};

		this.db.sessions.set(session.token, session);
		return session;
	}

	authenticate(token: string): User {
		const session = this.db.sessions.get(token);
		if (!session || session.expiresAt < new Date()) {
			throw new AppError("UNAUTHORIZED", "Session expired or invalid", 401);
		}

		const user = this.db.users.get(session.userId);
		if (!user) {
			throw new AppError("UNAUTHORIZED", "User not found", 401);
		}
		return user;
	}
}

class NotificationService {
	constructor(
		private readonly db: InMemoryDatabase,
		private readonly idGen: IdGenerator,
	) {}

	notify(userId: ID, type: NotificationType, message: string): AppNotification {
		const user = this.db.users.get(userId);
		if (!user) {
			throw new AppError("NOT_FOUND", "Cannot notify unknown user", 404);
		}

		const notification: AppNotification = {
			id: this.idGen.next("n"),
			userId,
			type,
			message,
			createdAt: new Date(),
			isRead: false,
		};

		this.db.notifications.set(notification.id, notification);
		return notification;
	}

	listForUser(userId: ID, page = 1, pageSize = 20): PaginatedResult<AppNotification> {
		const rows = [...this.db.notifications.values()]
			.filter((n) => n.userId === userId)
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

		return PaginationUtil.apply(rows, { page, pageSize });
	}

	markAsRead(userId: ID, notificationId: ID): AppNotification {
		const notification = this.db.notifications.get(notificationId);
		if (!notification || notification.userId !== userId) {
			throw new AppError("NOT_FOUND", "Notification not found", 404);
		}
		notification.isRead = true;
		return notification;
	}
}

class SocialGraphService {
	constructor(
		private readonly db: InMemoryDatabase,
		private readonly notifications: NotificationService,
	) {}

	follow(followerId: ID, followingId: ID): void {
		if (followerId === followingId) {
			throw new AppError("INVALID_INPUT", "You cannot follow yourself");
		}
		this.requireUser(followerId);
		this.requireUser(followingId);

		const key = `${followerId}:${followingId}`;
		if (this.db.follows.has(key)) {
			throw new AppError("ALREADY_EXISTS", "Already following this user", 409);
		}

		this.db.follows.add(key);
		const follower = this.requireUser(followerId);
		this.notifications.notify(
			followingId,
			"FOLLOW",
			`${follower.username} started following you.`,
		);
	}

	unfollow(followerId: ID, followingId: ID): void {
		const key = `${followerId}:${followingId}`;
		if (!this.db.follows.delete(key)) {
			throw new AppError("NOT_FOUND", "Follow relationship not found", 404);
		}
	}

	getFollowingIds(userId: ID): ID[] {
		const prefix = `${userId}:`;
		return [...this.db.follows]
			.filter((entry) => entry.startsWith(prefix))
			.map((entry) => entry.split(":")[1]);
	}

	private requireUser(userId: ID): User {
		const user = this.db.users.get(userId);
		if (!user) {
			throw new AppError("NOT_FOUND", "User not found", 404);
		}
		return user;
	}
}

class PostService {
	constructor(
		private readonly db: InMemoryDatabase,
		private readonly idGen: IdGenerator,
		private readonly socialGraph: SocialGraphService,
		private readonly notifications: NotificationService,
	) {}

	createPost(authorId: ID, content: string): Post {
		const author = this.requireUser(authorId);
		const trimmed = content.trim();
		if (!trimmed || trimmed.length > 280) {
			throw new AppError("INVALID_INPUT", "Post must be between 1 and 280 chars");
		}

		const hashtags = TextParser.extractHashtags(trimmed);
		const mentions = TextParser.extractMentions(trimmed);

		const post: Post = {
			id: this.idGen.next("post"),
			authorId,
			content: trimmed,
			createdAt: new Date(),
			updatedAt: new Date(),
			hashtags,
			mentions,
			likeCount: 0,
			repostCount: 0,
			replyCount: 0,
			isDeleted: false,
		};

		this.db.posts.set(post.id, post);

		for (const mentionUsername of mentions) {
			const mentionedUser = [...this.db.users.values()].find(
				(u) => u.username === mentionUsername,
			);
			if (mentionedUser && mentionedUser.id !== authorId) {
				this.notifications.notify(
					mentionedUser.id,
					"MENTION",
					`${author.username} mentioned you in a post.`,
				);
			}
		}

		return post;
	}

	updatePost(userId: ID, postId: ID, content: string): Post {
		const post = this.requirePost(postId);
		if (post.authorId !== userId) {
			throw new AppError("FORBIDDEN", "You can only edit your own posts", 403);
		}
		if (post.isDeleted) {
			throw new AppError("NOT_FOUND", "Post no longer exists", 404);
		}

		const trimmed = content.trim();
		if (!trimmed || trimmed.length > 280) {
			throw new AppError("INVALID_INPUT", "Post must be between 1 and 280 chars");
		}

		post.content = trimmed;
		post.hashtags = TextParser.extractHashtags(trimmed);
		post.mentions = TextParser.extractMentions(trimmed);
		post.updatedAt = new Date();
		return post;
	}

	deletePost(requestor: User, postId: ID): void {
		const post = this.requirePost(postId);
		if (post.authorId !== requestor.id && requestor.role !== "ADMIN") {
			throw new AppError("FORBIDDEN", "Cannot delete this post", 403);
		}
		post.isDeleted = true;
	}

	likePost(userId: ID, postId: ID): void {
		const user = this.requireUser(userId);
		const post = this.requirePost(postId);
		this.ensurePostVisible(post);

		const key = `${userId}:${postId}`;
		if (this.db.likes.has(key)) {
			throw new AppError("ALREADY_EXISTS", "You already liked this post", 409);
		}

		this.db.likes.add(key);
		post.likeCount += 1;

		if (post.authorId !== userId) {
			this.notifications.notify(
				post.authorId,
				"LIKE",
				`${user.username} liked your post.`,
			);
		}
	}

	unlikePost(userId: ID, postId: ID): void {
		const post = this.requirePost(postId);
		const key = `${userId}:${postId}`;
		if (!this.db.likes.delete(key)) {
			throw new AppError("NOT_FOUND", "Like not found", 404);
		}
		post.likeCount = Math.max(0, post.likeCount - 1);
	}

	repost(userId: ID, postId: ID): void {
		const user = this.requireUser(userId);
		const post = this.requirePost(postId);
		this.ensurePostVisible(post);

		const key = `${userId}:${postId}`;
		if (this.db.reposts.has(key)) {
			throw new AppError("ALREADY_EXISTS", "You already reposted this post", 409);
		}

		this.db.reposts.add(key);
		post.repostCount += 1;

		if (post.authorId !== userId) {
			this.notifications.notify(
				post.authorId,
				"REPOST",
				`${user.username} reposted your post.`,
			);
		}
	}

	bookmarkPost(userId: ID, postId: ID): void {
		this.requireUser(userId);
		const post = this.requirePost(postId);
		this.ensurePostVisible(post);

		const key = `${userId}:${postId}`;
		if (this.db.bookmarks.has(key)) {
			throw new AppError("ALREADY_EXISTS", "Post already bookmarked", 409);
		}

		this.db.bookmarks.add(key);
	}

	removeBookmark(userId: ID, postId: ID): void {
		const key = `${userId}:${postId}`;
		if (!this.db.bookmarks.delete(key)) {
			throw new AppError("NOT_FOUND", "Bookmark not found", 404);
		}
	}

	getBookmarkedPosts(userId: ID, page = 1, pageSize = 10): PaginatedResult<Post> {
		this.requireUser(userId);
		const prefix = `${userId}:`;
		const bookmarkedPostIds = new Set(
			[...this.db.bookmarks]
				.filter((entry) => entry.startsWith(prefix))
				.map((entry) => entry.split(":")[1]),
		);

		const rows = [...this.db.posts.values()]
			.filter((p) => !p.isDeleted && bookmarkedPostIds.has(p.id))
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

		return PaginationUtil.apply(rows, { page, pageSize });
	}

	createReply(userId: ID, postId: ID, content: string): Reply {
		const author = this.requireUser(userId);
		const post = this.requirePost(postId);
		this.ensurePostVisible(post);

		const trimmed = content.trim();
		if (!trimmed || trimmed.length > 280) {
			throw new AppError("INVALID_INPUT", "Reply must be between 1 and 280 chars");
		}

		const reply: Reply = {
			id: this.idGen.next("reply"),
			postId,
			authorId: userId,
			content: trimmed,
			createdAt: new Date(),
			updatedAt: new Date(),
			isDeleted: false,
		};

		this.db.replies.set(reply.id, reply);
		post.replyCount += 1;

		if (post.authorId !== userId) {
			this.notifications.notify(
				post.authorId,
				"REPLY",
				`${author.username} replied to your post.`,
			);
		}

		return reply;
	}

	getReplies(postId: ID, page = 1, pageSize = 20): PaginatedResult<Reply> {
		const post = this.requirePost(postId);
		this.ensurePostVisible(post);

		const rows = [...this.db.replies.values()]
			.filter((r) => r.postId === postId && !r.isDeleted)
			.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

		return PaginationUtil.apply(rows, { page, pageSize });
	}

	getFeed(userId: ID, page = 1, pageSize = 10): PaginatedResult<Post> {
		const following = new Set(this.socialGraph.getFollowingIds(userId));
		following.add(userId);

		const rows = [...this.db.posts.values()]
			.filter((p) => !p.isDeleted && following.has(p.authorId))
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

		return PaginationUtil.apply(rows, { page, pageSize });
	}

	searchPosts(query: string, page = 1, pageSize = 10): PaginatedResult<Post> {
		const q = query.trim().toLowerCase();
		const rows = [...this.db.posts.values()]
			.filter((p) => !p.isDeleted)
			.filter(
				(p) =>
					p.content.toLowerCase().includes(q) ||
					p.hashtags.some((h) => h.includes(q)) ||
					p.mentions.some((m) => m.includes(q)),
			)
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

		return PaginationUtil.apply(rows, { page, pageSize });
	}

	trendingHashtags(limit = 5): Array<{ hashtag: string; count: number }> {
		const counter = new Map<string, number>();

		for (const post of this.db.posts.values()) {
			if (post.isDeleted) {
				continue;
			}
			for (const hashtag of post.hashtags) {
				counter.set(hashtag, (counter.get(hashtag) ?? 0) + 1);
			}
		}

		return [...counter.entries()]
			.map(([hashtag, count]) => ({ hashtag, count }))
			.sort((a, b) => b.count - a.count)
			.slice(0, limit);
	}

	private ensurePostVisible(post: Post): void {
		if (post.isDeleted) {
			throw new AppError("NOT_FOUND", "Post no longer exists", 404);
		}
	}

	private requirePost(postId: ID): Post {
		const post = this.db.posts.get(postId);
		if (!post) {
			throw new AppError("NOT_FOUND", "Post not found", 404);
		}
		return post;
	}

	private requireUser(userId: ID): User {
		const user = this.db.users.get(userId);
		if (!user) {
			throw new AppError("NOT_FOUND", "User not found", 404);
		}
		return user;
	}
}

class UserService {
	constructor(private readonly db: InMemoryDatabase) {}

	updateProfile(userId: ID, input: { bio?: string; username?: string }): User {
		const user = this.db.users.get(userId);
		if (!user) {
			throw new AppError("NOT_FOUND", "User not found", 404);
		}

		if (input.username) {
			const normalized = input.username.trim().toLowerCase();
			if (!normalized) {
				throw new AppError("INVALID_INPUT", "Username cannot be empty");
			}
			const alreadyTaken = [...this.db.users.values()].some(
				(u) => u.username === normalized && u.id !== userId,
			);
			if (alreadyTaken) {
				throw new AppError("USERNAME_TAKEN", "Username already exists", 409);
			}
			user.username = normalized;
		}

		if (typeof input.bio === "string") {
			user.bio = input.bio.trim().slice(0, 160);
		}

		return user;
	}

	searchUsers(query: string, page = 1, pageSize = 10): PaginatedResult<User> {
		const q = query.trim().toLowerCase();
		const rows = [...this.db.users.values()]
			.filter(
				(u) =>
					u.username.includes(q) ||
					u.email.includes(q) ||
					(u.bio ?? "").toLowerCase().includes(q),
			)
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

		return PaginationUtil.apply(rows, { page, pageSize });
	}
}

class RateLimiterService {
	private readonly buckets = new Map<string, { count: number; resetAt: number }>();

	allow(userId: ID, action: string, maxRequests: number, windowMs: number): boolean {
		const key = `${userId}:${action}`;
		const now = Date.now();
		const existing = this.buckets.get(key);

		if (!existing || existing.resetAt < now) {
			this.buckets.set(key, { count: 1, resetAt: now + windowMs });
			return true;
		}

		if (existing.count >= maxRequests) {
			return false;
		}

		existing.count += 1;
		return true;
	}
}

class TwitterLikeBackend {
	readonly db = new InMemoryDatabase();
	readonly idGen = new IdGenerator();
	readonly notifications = new NotificationService(this.db, this.idGen);
	readonly socialGraph = new SocialGraphService(this.db, this.notifications);
	readonly postService = new PostService(
		this.db,
		this.idGen,
		this.socialGraph,
		this.notifications,
	);
	readonly authService = new AuthService(this.db, this.idGen);
	readonly userService = new UserService(this.db);
	readonly rateLimiter = new RateLimiterService();

	createPostWithRateLimit(userId: ID, content: string): Post {
		const allowed = this.rateLimiter.allow(userId, "create_post", 10, 60_000);
		if (!allowed) {
			throw new AppError(
				"RATE_LIMIT",
				"Too many posts created. Try again in a minute.",
				429,
			);
		}
		return this.postService.createPost(userId, content);
	}
}

// Example usage
const app = new TwitterLikeBackend();

const alice = app.authService.register({
	username: "alice",
	email: "alice@example.com",
	password: "password123",
	bio: "Building cool things with TypeScript",
});

const bob = app.authService.register({
	username: "bob",
	email: "bob@example.com",
	password: "password123",
});

const admin = app.authService.register({
	username: "admin",
	email: "admin@example.com",
	password: "password123",
	role: "ADMIN",
});

app.socialGraph.follow(bob.id, alice.id);

const p1 = app.createPostWithRateLimit(
	alice.id,
	"Learning backend architecture with #TypeScript and @bob",
);
app.postService.likePost(bob.id, p1.id);
app.postService.repost(bob.id, p1.id);
app.postService.bookmarkPost(bob.id, p1.id);
app.postService.createReply(bob.id, p1.id, "Great post! I learned a lot from this.");

app.userService.updateProfile(bob.id, {
	bio: "I love scalable APIs and distributed systems",
});

const bobFeed = app.postService.getFeed(bob.id, 1, 10);
const bobBookmarks = app.postService.getBookmarkedPosts(bob.id, 1, 10);
const p1Replies = app.postService.getReplies(p1.id, 1, 10);
const trending = app.postService.trendingHashtags();
const bobNotifications = app.notifications.listForUser(bob.id, 1, 10);
const aliceNotifications = app.notifications.listForUser(alice.id, 1, 10);

console.log("Bob feed:", bobFeed.items.map((p) => p.content));
console.log("Bob bookmarks:", bobBookmarks.items.map((p) => p.content));
console.log("Replies on first post:", p1Replies.items.map((r) => r.content));
console.log("Trending:", trending);
console.log("Bob notifications:", bobNotifications.items.map((n) => n.message));
console.log(
	"Alice notifications:",
	aliceNotifications.items.map((n) => n.message),
);

// Admin moderation example
app.postService.deletePost(admin, p1.id);
