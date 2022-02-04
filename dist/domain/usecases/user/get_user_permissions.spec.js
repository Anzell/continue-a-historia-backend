"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_ts_1 = require("either-ts");
const failures_1 = require("../../../core/failures/failures");
const get_user_permissions_1 = require("./get_user_permissions");
describe('get user permissions usecase', function () {
    const permissionExample = "user";
    it('should return a valid permission if call to repository is success', async function () {
        const mockRepository = {
            getUserById: jest.fn(),
            getUserPermissions: jest.fn().mockReturnValue((0, either_ts_1.right)(permissionExample))
        };
        const usecase = new get_user_permissions_1.GetUserPermissionsUsecase(mockRepository);
        const result = await usecase.handle(new get_user_permissions_1.GetUserPermissionsUsecaseParams({ id: "exampleId" }));
        expect(result).toStrictEqual((0, either_ts_1.right)(permissionExample));
    });
    it('should return left ServerFailure if a error ocurred in repository', async function () {
        const mockRepository = {
            getUserById: jest.fn(),
            getUserPermissions: jest.fn().mockReturnValue((0, either_ts_1.left)(new failures_1.ServerFailure()))
        };
        const usecase = new get_user_permissions_1.GetUserPermissionsUsecase(mockRepository);
        const result = await usecase.handle(new get_user_permissions_1.GetUserPermissionsUsecaseParams({ id: "exampleId" }));
        expect(result).toStrictEqual((0, either_ts_1.left)(new failures_1.ServerFailure()));
    });
});
