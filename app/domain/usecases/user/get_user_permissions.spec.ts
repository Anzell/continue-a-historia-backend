import {UserRepository} from "../../repositories/user_repository";
import {left, right} from "either-ts";
import {ServerFailure} from "../../../core/failures/failures";
import {GetUserPermissionsUsecase, GetUserPermissionsUsecaseParams} from "./get_user_permissions";

describe('get user permissions usecase', function () {
    const permissionExample = "user";

    it('should return a valid permission if call to repository is success', async function () {
        const mockRepository: UserRepository = {
            getUserById: jest.fn(),
            getUserPermissions: jest.fn().mockReturnValue(right(permissionExample))
        };
        const usecase = new GetUserPermissionsUsecase(mockRepository);
        const result = await usecase.handle(new GetUserPermissionsUsecaseParams({id: "exampleId"}));
        expect(result).toStrictEqual(right(permissionExample));
    });

    it('should return left ServerFailure if a error ocurred in repository', async function () {
        const mockRepository: UserRepository = {
            getUserById: jest.fn(),
            getUserPermissions: jest.fn().mockReturnValue(left(new ServerFailure()))
        };
        const usecase = new GetUserPermissionsUsecase(mockRepository);
        const result = await usecase.handle(new GetUserPermissionsUsecaseParams({id: "exampleId"}));
        expect(result).toStrictEqual(left(new ServerFailure()));
    });
});