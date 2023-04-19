import { Module } from "@nestjs/common";
import { IdeaController } from "./idea.controller";
import { IdeaService } from "./idea.service";
import { IdeaGateway } from "./idea.gateway";

@Module({
  controllers: [IdeaController],
  providers: [IdeaService, IdeaGateway]
})
export class IdeaModule {
}
