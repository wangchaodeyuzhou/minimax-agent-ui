// c-command 组件暂时没用到
export type CommandExecutionStatus =
  | { status: "started"; executionId: string; pid?: number }
  | { status: "output"; executionId: string; output: string }
  | { status: "fallback"; executionId: string }
  | { status: "exited"; executionId: string; exitCode: number }

export interface CommandPattern {
  pattern: string
  description?: string
}
