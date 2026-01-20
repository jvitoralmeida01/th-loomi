import { injectable, inject } from "tsyringe";
import { INortusRepository } from "@/src/application/repositories.interface/INortusRepository";
import { TicketResponse } from "@/src/domain/responses/tickets";
import { TicketStatusValues } from "@/src/domain/entities/tickets";

export interface GetInfoCardsDataInput {}

export interface GetInfoCardsDataOutput {
  openedTickets: string;
  inProgressTickets: string;
  resolvedTodayTickets: string;
  averageTime: string;
}

@injectable()
export class GetInfoCardsDataUseCase {
  constructor(
    @inject(INortusRepository)
    private readonly nortusRepository: INortusRepository
  ) {}

  async execute(_: GetInfoCardsDataInput): Promise<GetInfoCardsDataOutput> {
    const allTicketsResponse = await this.nortusRepository.getAllTickets();
    const openedTickets = this._extractOpenedTickets(allTicketsResponse.data);
    const inProgressTickets = this._extractInProgressTickets(
      allTicketsResponse.data
    );
    const { resolvedTodayTickets, averageTime } =
      this._extractResolvedTodayTickets(allTicketsResponse.data);

    return {
      openedTickets: openedTickets.toString(),
      inProgressTickets: inProgressTickets.toString(),
      resolvedTodayTickets: resolvedTodayTickets.toString(),
      averageTime: averageTime,
    };
  }

  _extractOpenedTickets(tickets: TicketResponse[]): number {
    return tickets.filter((ticket) => ticket.status === TicketStatusValues[0])
      .length;
  }

  _extractInProgressTickets(tickets: TicketResponse[]): number {
    return tickets.filter((ticket) => ticket.status === TicketStatusValues[1])
      .length;
  }

  _extractResolvedTodayTickets(tickets: TicketResponse[]): {
    resolvedTodayTickets: number;
    averageTime: string;
  } {
    const resolvedTodayTickets = tickets.filter((ticket) => {
      const updatedAt = new Date(ticket.updatedAt);
      const isResolved = ticket.status === TicketStatusValues[2];
      const wasResolvedToday =
        updatedAt.toDateString() === new Date().toDateString();

      return isResolved && wasResolvedToday;
    });

    const totalTime = resolvedTodayTickets.reduce((acc, ticket) => {
      const createdAt = new Date(ticket.createdAt);
      const updatedAt = new Date(ticket.updatedAt);
      const timeDiff = updatedAt.getTime() - createdAt.getTime();

      return acc + timeDiff;
    }, 0);
    const averageTimeInMinutes = totalTime / resolvedTodayTickets.length;

    let averageTime = "...";
    if (!isNaN(averageTimeInMinutes)) {
      const hours = Math.floor(averageTimeInMinutes / 60);
      averageTime = `${hours < 10 ? "<1" : hours}h`;
    }

    return { resolvedTodayTickets: resolvedTodayTickets.length, averageTime };
  }
}
