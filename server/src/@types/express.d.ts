type Sender = {
  send(record: ProducerRecord): Promise<RecordMetadata[]>;
  sendBatch(batch: ProducerBatch): Promise<RecordMetadata[]>;
};

type Producer = Sender & {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isIdempotent(): boolean;
  events: ProducerEvents;
  on(
    eventName: ValueOf<ProducerEvents>,
    listener: (...args: any[]) => void
  ): RemoveInstrumentationEventListener<typeof eventName>;
  transaction(): Promise<Transaction>;
  logger(): Logger;
};

declare namespace Express {
  export interface Request {
    producer: Producer;
  }
}
