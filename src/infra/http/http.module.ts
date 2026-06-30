import { FechRecentQuestionsController } from './controllers/fetch-recent-questions.controller copy';
import { CreateQuestionController } from './controllers/create-question.controller';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateAccountController } from './controllers/create-account.controller';
import { Module } from "@nestjs/common";
import { DatabaseModule } from '../database/database.module';

@Module({

  imports: [DatabaseModule],
 
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FechRecentQuestionsController,
  ],
})
export class HttpModule {}
