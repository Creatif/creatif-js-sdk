import { describe, expect, it } from 'vitest';
import { workingTestProjects } from './projects';
// @ts-ignore
import { equal, unequal, lessThan, greaterThan, paginateListItems, initialize } from '@root';
// @ts-ignore
import { ListItem } from '@appTypes/types/Lists';

function assertSingleResultValid(res: ListItem<any>) {
    expect(res.value).not.toBe(undefined);
    expect(res.structureId).not.toBe(undefined);
    expect(res.structureShortId).not.toBe(undefined);
    expect(res.structureName).equal('Properties');
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

describe('Query test', () => {
    it('should paginate through list items with a propertyType query', async () => {
        const testProjects = workingTestProjects;

        for (let i = 0; i < testProjects.length; i++) {
            const projectId = testProjects[i];

            initialize({
                projectId: projectId,
                baseUrl: 'http://localhost:3002',
            });

            const { result, error } = await paginateListItems({
                projectId: projectId,
                structureName: 'Properties',
                page: 1,
                limit: 100,
                versionName: 'v1',
                query: [
                    equal('propertyType', 'Studio'),
                    unequal('propertyStatus', 'Rent'),
                    lessThan('studioFloorNumber', 50),
                    greaterThan('studioSize', 20),
                ],
            });

            expect(error).toBe(undefined);
            expect(result).not.toBe(undefined);
            expect(result.length).greaterThan(0)
            for (const res of result) {
                assertSingleResultValid(res);
            }
        }
    });
});
