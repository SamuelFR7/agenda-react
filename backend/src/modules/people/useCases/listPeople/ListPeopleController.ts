import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListPeopleUseCase } from './ListPeopleUseCase'

class ListPeopleController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { page } = req.params
        const { name } = req.query

        const listPeopleUseCase = container.resolve(ListPeopleUseCase)

        const response = await listPeopleUseCase.execute(
            Number(page),
            name as string
        )

        return res.status(200).json(response)
    }
}

export { ListPeopleController }
