// ============================================================
//  types/compiler.types.ts
//  All TypeScript interfaces and types for the Code Compiler
// ============================================================

/** Supported programming languages with their Judge0 language IDs */
export interface Language {
    id: number;
    name: string;
    monacoId: string;        // Monaco editor language identifier
    extension: string;       // File extension
    boilerplate: string;     // Default starter code shown in editor
}

/** Payload sent by the client to compile/run code */
export interface CompileRequest {
    sourceCode: string;
    languageId: number;
    stdin?: string;           // Optional standard input
}

/** Internal submission object sent to Judge0 */
export interface Judge0Submission {
    source_code: string;
    language_id: number;
    stdin?: string;
    cpu_time_limit?: number;
    memory_limit?: number;
}

/** Token response from Judge0 after submission */
export interface SubmissionToken {
    token: string;
}

/** Judge0 submission result status */
export interface Judge0Status {
    id: number;
    description: string;
}

/** Full result returned by Judge0 */
export interface Judge0Result {
    stdout: string | null;
    stderr: string | null;
    compile_output: string | null;
    message: string | null;
    status: Judge0Status;
    time: string | null;
    memory: number | null;
    token: string;
}

/** Structured response back to the client */
export interface CompileResponse {
    success: boolean;
    output: string;
    stderr: string;
    compileOutput: string;
    executionTime: string | null;
    memoryUsed: string | null;
    statusId: number;
    statusDescription: string;
}

/** Generic API error shape */
export interface ApiError {
    message: string;
    statusCode: number;
}

/** Judge0 status IDs */
export const enum StatusId {
    IN_QUEUE = 1,
    PROCESSING = 2,
    ACCEPTED = 3,
    WRONG_ANSWER = 4,
    TIME_LIMIT_EXCEEDED = 5,
    COMPILATION_ERROR = 6,
    RUNTIME_ERROR_SIGSEGV = 7,
    RUNTIME_ERROR_SIGXFSZ = 8,
    RUNTIME_ERROR_SIGFPE = 9,
    RUNTIME_ERROR_SIGABRT = 10,
    RUNTIME_ERROR_NZEC = 11,
    RUNTIME_ERROR_OTHER = 12,
    INTERNAL_ERROR = 13,
    EXEC_FORMAT_ERROR = 14,
}
