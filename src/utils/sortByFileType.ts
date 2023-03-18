import { Item } from "@prisma/client";

/**
 * Sorts an array of files by type.
 * @param files array of files
 * @returns sorted array of files
 */
export default function sortByFileType(files: Item[]): Item[] {

    const sortedFiles = files.sort((a, b) => {
        if (a.isFolder) {
            return -1;
        } else if (b.isFolder) {
            return 1;
        } else {
            return 0;
        }
    });

    return sortedFiles;
};
