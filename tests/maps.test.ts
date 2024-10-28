import {describe, expect, it} from 'vitest';
import {workingTestProjects} from './projects';
// @ts-ignore
import {equal, unequal, paginateMapItems, initialize, getMapItemById, getMapItemByName} from '@root';
// @ts-ignore
import {MapItem} from '@appTypes/types/Maps';

function assertSingleResultValid(res: MapItem<any>) {
    expect(res.value).not.toBe(undefined);
    expect(res.structureId).not.toBe(undefined);
    expect(res.structureShortId).not.toBe(undefined);
    expect(res.structureName).equal('Accounts');
    expect(res.itemName).not.toBe(undefined);
    expect(res.itemId).not.toBe(undefined);
    expect(res.itemShortId).not.toBe(undefined);
    expect(res.projectId).not.toBe(undefined);
    expect(res.locale).not.toBe(undefined);
    expect(res.behaviour).not.toBe(undefined);
    expect(res.createdAt).not.toBe(undefined);
    expect(res.updatedAt).not.toBe(undefined);
    expect(res.groups.length).equal(3);
}

describe('Map test', () => {
    it("should fail multiple times validating the query of paginate map items", async () => {
        const projectId = workingTestProjects[0];

        initialize({
            projectId: projectId,
            baseUrl: "http://localhost:3002",
        })

        const {error} = await paginateMapItems({
            structureName: "",
            page: 0,
            versionName: '',
            groups: '',
            orderBy: 9,
            orderDirection: 'invalid',
            search: 343,
            query: [
                equal('', ''),
                unequal('', ''),
            ]
        })

        expect(error).not.toBe(undefined);
        expect(Object.values(error.messages).length).equal(7)
    });

    it('should paginate through map items', async () => {
        const testProjects = workingTestProjects;

        for (let i = 0; i < testProjects.length; i++) {
            const projectId = testProjects[i];

            initialize({
                projectId: projectId,
                baseUrl: "http://localhost:3002",
            })

            const {result: firstResult, error: firstError} = await paginateMapItems({
                projectId: projectId,
                structureName: "Accounts",
                page: 1,
                limit: 5,
                versionName: 'v1',
            });

            expect(firstError).toBe(undefined);
            expect(firstResult).not.toBe(undefined);
            expect(firstResult.length).equal(5);
            for (const res of firstResult) {
                assertSingleResultValid(res);
            }

            let {result: secondResult, error: secondError} = await paginateMapItems({
                projectId: projectId,
                structureName: "Accounts",
                page: 1,
                limit: 5,
                versionName: 'v1',
            });

            expect(secondError).toBe(undefined);
            expect(secondResult).not.toBe(undefined);
            expect(secondResult.length).equal(5);
            for (const res of secondResult) {
                assertSingleResultValid(res);
            }
        }
    });

    it('should get map item by id', async () => {
        const testProjects = workingTestProjects;

        for (let i = 0; i < testProjects.length; i++) {
            const projectId = testProjects[i];

            initialize({
                projectId: projectId,
                baseUrl: "http://localhost:3002",
            })

            const {result, error} = await paginateMapItems({
                projectId: projectId,
                structureName: "Accounts",
                page: 1,
                limit: 10,
                versionName: 'v1',
            });

            expect(error).toBe(undefined);
            expect(result).not.toBe(undefined);
            expect(result.length).equal(10);
            for (const res of result) {
                assertSingleResultValid(res);
                const itemId = res.itemId;

                const {result, error} = await getMapItemById({
                    versionName: 'v1',
                    id: itemId,
                });

                expect(error).toBe(undefined);
                assertSingleResultValid(result);
            }
        }
    });

    it('should get map item by name', async () => {
        const testProjects = workingTestProjects;

        for (let i = 0; i < testProjects.length; i++) {
            const projectId = testProjects[i];

            initialize({
                projectId: projectId,
                baseUrl: "http://localhost:3002",
            })

            const {result, error} = await paginateMapItems({
                projectId: projectId,
                structureName: "Accounts",
                page: 1,
                limit: 10,
                versionName: 'v1',
            });

            expect(error).toBe(undefined);
            expect(result).not.toBe(undefined);
            expect(result.length).equal(10);
            for (const res of result) {
                assertSingleResultValid(res);
                const itemId = res.itemName;
                const locale = res.locale;

                const {result, error} = await getMapItemByName({
                    versionName: 'v1',
                    name: itemId,
                    structureName: 'Accounts',
                    locale: locale,
                });

                expect(error).toBe(undefined);
                assertSingleResultValid(result);
            }
        }
    });
})
