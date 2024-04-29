export interface ApiEvent {
  name: string
  start: string
  end: string
  type: string
  card_id: number
  status: string
  color: string
  human_type: string
  comment?: string
  event_id?: number
  contract_id?: number
}
