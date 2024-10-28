import { describe, expect, it } from 'vitest';
import { workingTestProjects } from './projects';
// @ts-ignore
import { getVersions, initialize } from '@root';
// @ts-ignore
import { MapItem } from '@appTypes/types/Maps';

describe('Version test', () => {
    it('should get all versions of a project', async () => {
        for (const projectId of workingTestProjects) {
            initialize({
                projectId: projectId,
                baseUrl: 'http://localhost:3002',
            });

            const { result, error } = await getVersions();

            expect(error).equal(undefined);

            for (const version of result) {
                expect(version.id).not.toBe(undefined);
                expect(version.projectId).equal(projectId);
                expect(version.name).equal('v1');
                expect(version.createdAt).not.toBe(undefined);
                expect(version.createdAt).not.toBe(undefined);
            }
        }
    });
});
