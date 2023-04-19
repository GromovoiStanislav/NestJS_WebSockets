import { Body, Controller, Post } from "@nestjs/common";
import { IdeaService } from "./idea.service";

@Controller("ideas")
export class IdeaController {

  constructor(private ideaService: IdeaService) {
  }

  @Post()
  createIdea(@Body() dto: { message: string }) {
    return this.ideaService.create(dto.message);
  }

}
