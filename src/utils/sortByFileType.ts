import { FileType } from "src/types/fileType";

/**
 * Sorts an array of files by type.
 * @param files array of files
 * @returns sorted array of files
 */
export default function sortByFileType(files: FileType[]): FileType[] {

    const sortedFiles = files.sort((a, b) => {
        if (a.type === "directory" && b.type === "file") {
            return -1;
        } else if (a.type === "file" && b.type === "directory") {
            return 1;
        } else {
            return 0;
        }
    });

    return sortedFiles;
};
