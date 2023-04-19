import { Injectable } from "@nestjs/common";
import { IdeaGateway } from "./idea.gateway";

@Injectable()
export class IdeaService {

  constructor(
    //@InjectRepository(IdeaEntity) private ideaRepository: Repository<IdeaEntity>,
    private gateway: IdeaGateway
  ) {
  }


  async create(message: string): Promise<any> {

    const idea = {
      idea: message,
      description: "description"
    };

    // await this.ideaRepository.save(idea);
    this.gateway.wss.emit("newIdea", idea);
    return idea;
  }

}
