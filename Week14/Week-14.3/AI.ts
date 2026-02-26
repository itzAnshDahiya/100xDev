/**
 * ChatBot Backend Implementation (Simulation)
 * This code demonstrates the core logic, types, and features for an AI ChatBot backend.
 */

// --- Types & Interfaces ---

/**
 * Supported AI Models
 */
export enum AIModel {
    GPT_3_5_TURBO = "gpt-3.5-turbo",
    GPT_4 = "gpt-4",
    GPT_4_OMNI = "gpt-4o",
    CLAUDE_3_5_SONNET = "claude-3-5-sonnet"
}

/**
 * Roles for messages in a conversation
 */
export type MessageRole = "user" | "assistant" | "system";

/**
 * Represents a single message in a chat history
 */
export interface ChatMessage {
    id: string;
    role: MessageRole;
    content: string;
    timestamp: Date;
    metadata?: {
        tokensUsed?: number;
        modelUsed?: AIModel;
        latencyMs?: number;
    }
}

/**
 * Represents a chat session/history
 */
export interface Conversation {
    id: string;
    userId: string;
    title: string;
    messages: ChatMessage[];
    createdAt: Date;
    updatedAt: Date;
    model: AIModel;
}

/**
 * User account details
 */
export interface User {
    id: string;
    email: string;
    name: string;
    isPremium: boolean;
    tokenAllowance: number;
    tokensConsumed: number;
}

// --- Feature Implementation: AI Platform ---

export class AIChatPlatform {
    private conversations: Map<string, Conversation> = new Map();
    private users: Map<string, User> = new Map();

    constructor() {
        // Mock data initialization
        this.addMockUser();
    }

    private addMockUser(): void {
        const mockUser: User = {
            id: "user_001",
            email: "user@example.com",
            name: "Ansh Dahiya",
            isPremium: true,
            tokenAllowance: 100000,
            tokensConsumed: 0
        };
        this.users.set(mockUser.id, mockUser);
    }

    /**
     * FEATURE: Start a new conversation
     */
    public createConversation(userId: string, title: string, model: AIModel = AIModel.GPT_4_OMNI): Conversation {
        const newConversation: Conversation = {
            id: `conv_${Date.now()}`,
            userId,
            title,
            messages: [
                {
                    id: `msg_sys_${Date.now()}`,
                    role: "system",
                    content: "You are a helpful AI assistant.",
                    timestamp: new Date()
                }
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
            model
        };
        this.conversations.set(newConversation.id, newConversation);
        return newConversation;
    }

    /**
     * FEATURE: Send a message & get AI response (Simulated)
     */
    public async sendMessage(conversationId: string, userId: string, text: string): Promise<ChatMessage> {
        const conversation = this.conversations.get(conversationId);
        const user = this.users.get(userId);

        if (!conversation) throw new Error("Conversation not found");
        if (!user) throw new Error("User not found");

        // 1. Check token limits (Safety Feature)
        if (user.tokensConsumed >= user.tokenAllowance) {
            throw new Error("Token limit reached. Please upgrade your plan.");
        }

        // 2. Add user message
        const userMessage: ChatMessage = {
            id: `msg_u_${Date.now()}`,
            role: "user",
            content: text,
            timestamp: new Date()
        };
        conversation.messages.push(userMessage);

        // 3. Simulate AI Processing & Response
        console.log(`[AI] Processing message with model: ${conversation.model}...`);
        
        // Simulating network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const aiResponseContent = this.generateMockResponse(text);
        const tokensUsed = aiResponseContent.split(' ').length * 1.5; // Rough token estimation

        const assistantMessage: ChatMessage = {
            id: `msg_a_${Date.now()}`,
            role: "assistant",
            content: aiResponseContent,
            timestamp: new Date(),
            metadata: {
                tokensUsed,
                modelUsed: conversation.model,
                latencyMs: 1200
            }
        };

        // 4. Update state
        conversation.messages.push(assistantMessage);
        conversation.updatedAt = new Date();
        user.tokensConsumed += tokensUsed;

        return assistantMessage;
    }

    /**
     * FEATURE: Mock Response Generator (Logic Core)
     */
    private generateMockResponse(userInput: string): string {
        const lowerInput = userInput.toLowerCase();
        if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
            return "Hello! How can I assist you today?";
        } else if (lowerInput.includes("who are you")) {
            return "I am a custom AI assistant designed to help you with your tasks.";
        } else if (lowerInput.includes("code")) {
            return "I love coding! Are you looking for TypeScript help?";
        }
        return `I received your message: "${userInput}". Since this is a simulation, I'm providing this generic but helpful response!`;
    }

    /**
     * FEATURE: Fetch Chat History
     */
    public getChatHistory(conversationId: string): ChatMessage[] {
        const conversation = this.conversations.get(conversationId);
        return conversation ? conversation.messages : [];
    }

    /**
     * FEATURE: Delete Conversation
     */
    public deleteConversation(conversationId: string): boolean {
        return this.conversations.delete(conversationId);
    }

    /**
     * FEATURE: Update Conversation Title (Summarization simulation)
     */
    public updateTitle(conversationId: string, newTitle: string): void {
        const conv = this.conversations.get(conversationId);
        if (conv) conv.title = newTitle;
    }
}

// --- Example Usage ---

const platform = new AIChatPlatform();

async function runDemo() {
    console.log("--- Initializing AI Chat Bot Backend ---");
    
    // 1. Create a session
    const myChat = platform.createConversation("user_001", "Coding Help", AIModel.GPT_4_OMNI);
    console.log(`Session Created: ${myChat.title} (${myChat.id})`);

    // 2. Chatting
    console.log("\nUser: Hi there!");
    const response1 = await platform.sendMessage(myChat.id, "user_001", "Hi there!");
    console.log(`Assistant: ${response1.content}`);

    console.log("\nUser: Write a simple TypeScript function.");
    const response2 = await platform.sendMessage(myChat.id, "user_001", "Write a simple TypeScript function.");
    console.log(`Assistant: ${response2.content}`);

    // 3. Inspect History
    console.log("\n--- Chat History Logs ---");
    console.table(platform.getChatHistory(myChat.id));
}

runDemo().catch(console.error);
