import { expect } from 'vitest'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-momery-questions-repositories'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { FetRecentQuestionsUseCase } from './fetch-recent-topics'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetRecentQuestionsUseCase

describe('Fetch recent questions', () => {

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('Should be able to fetch recent questions', async () => {

    await inMemoryQuestionsRepository.create(makeQuestion({
      createdAt: new Date(2022, 0, 20)
    }))
    await inMemoryQuestionsRepository.create(makeQuestion({
      createdAt: new Date(2022, 0, 18)
    }))
    await inMemoryQuestionsRepository.create(makeQuestion({
      createdAt: new Date(2022, 0, 23)
    }))

    const {question} = await sut.execute({
      page: 1
    })

    expect(question).toEqual([
      expect.objectContaining({   createdAt: new Date(2022, 0, 23)}),
      expect.objectContaining({   createdAt: new Date(2022, 0, 20)}),
      expect.objectContaining({   createdAt: new Date(2022, 0, 18)})
    ])

  })
  
  it('Should be able to fetch paginated recent questions', async () => {

     for(let i =1; i <= 22; i++){
        await inMemoryQuestionsRepository.create(makeQuestion())
     }

    const {question} = await sut.execute({
      page: 2,
    })

    expect(question).toHaveLength(2)

  })
})

