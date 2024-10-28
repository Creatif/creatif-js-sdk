import { describe, expect, it } from 'vitest';
import { workingTestProjects } from './projects';
// @ts-ignore
import { equal, unequal, paginateListItems, paginateMapItems, initialize } from '@root';
// @ts-ignore
import { MapItem } from '@appTypes/types/Maps';

describe('Value only test', () => {
    it('should paginate through list items and get values only', async () => {
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
                limit: 5,
                versionName: 'v1',
                options: {
                    valueOnly: true,
                }
            });

            expect(error).toBe(undefined);
            expect(result).not.toBe(undefined);
            expect(result.length).equal(5);

            for (const res of result) {
                expect(res.address).not.toBe(undefined);
                expect(res.postalCode).not.toBe(undefined);
                expect(res.city).not.toBe(undefined);
            }
        }
    });

    it('should paginate through map items and get values only', async () => {
        const testProjects = workingTestProjects;

        for (let i = 0; i < testProjects.length; i++) {
            const projectId = testProjects[i];

            initialize({
                projectId: projectId,
                baseUrl: 'http://localhost:3002',
            });

            const { result, error } = await paginateMapItems({
                projectId: projectId,
                structureName: 'Accounts',
                page: 1,
                limit: 5,
                versionName: 'v1',
                options: {
                    valueOnly: true,
                }
            });

            expect(error).toBe(undefined);
            expect(result).not.toBe(undefined);
            expect(result.length).equal(5);

            for (const res of result) {
                expect(res.address).not.toBe(undefined);
                expect(res.postalCode).not.toBe(undefined);
                expect(res.city).not.toBe(undefined);
            }
        }
    });
});
