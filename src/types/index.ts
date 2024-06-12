export enum ComplianceStatus {
  NotCompleted = "não concluído",
  Completed = "concluído"
}

export type TaskProps = {
    id: number | string,
    title: string
    category: string
    description: string
    createdAt: Date,
    isComplied: ComplianceStatus,
    priority: number
  }