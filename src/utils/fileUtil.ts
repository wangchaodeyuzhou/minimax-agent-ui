import MimeUtil from "@/utils/mimeUtil";
import StringUtil from "@/utils/stringUtil";
import archiveSvg from "@/assets/file/archive.svg";
import audioSvg from "@/assets/file/audio.svg";
import docSvg from "@/assets/file/doc.svg";
import fileSvg from "@/assets/file/file.svg";
import folderSvg from "@/assets/file/folder.svg";
import imageSvg from "@/assets/file/image.svg";
import pdfSvg from "@/assets/file/pdf.svg";
import pptSvg from "@/assets/file/ppt.svg";
import psdSvg from "@/assets/file/psd.svg";
import textSvg from "@/assets/file/text.svg";
import videoSvg from "@/assets/file/video.svg";
import xlsSvg from "@/assets/file/xls.svg";
import path from "path-browserify";

export default class FileUtil {
    static isImage(name: string | null): boolean {
        const mimeType = MimeUtil.getMimeType(name);
        return StringUtil.startWith(mimeType, 'image');
    }

    static isPdf(name: string | null): boolean {
        const mimeType = MimeUtil.getMimeType(name);
        return StringUtil.startWith(mimeType, 'application/pdf');
    }

    static isText(name: string | null): boolean {
        const mimeType = MimeUtil.getMimeType(name);
        return StringUtil.startWith(mimeType, 'text');
    }

    static isDoc(name: string | null): boolean {
        const mimeType = MimeUtil.getMimeType(name);
        return (
            StringUtil.startWith(mimeType, 'application/msword') ||
            StringUtil.startWith(
                mimeType,
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            )
        );
    }

    static isPpt(name: string | null): boolean {
        const mimeType = MimeUtil.getMimeType(name);
        return (
            StringUtil.startWith(mimeType, 'application/vnd.ms-powerpoint') ||
            StringUtil.startWith(
                mimeType,
                'application/vnd.openxmlformats-officedocument.presentationml.presentation'
            )
        );
    }

    static isXls(name: string | null): boolean {
        const mimeType = MimeUtil.getMimeType(name);
        return (
            StringUtil.startWith(mimeType, 'application/vnd.ms-excel') ||
            StringUtil.startWith(
                mimeType,
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            )
        );
    }

    static isAudio(name: string | null): boolean {
        const mimeType = MimeUtil.getMimeType(name);
        return StringUtil.startWith(mimeType, 'audio');
    }

    static isVideo(name: string | null): boolean {
        const mimeType = MimeUtil.getMimeType(name);
        return StringUtil.startWith(mimeType, 'video');
    }

    static isPsd(name: string | null): boolean {
        const extension = path.extname(name);
        return extension === '.psd';
    }

    static isArchive(name: string | null): boolean {
        return StringUtil.endWith(name, 'zip') ||
            StringUtil.endWith(name, 'rar') ||
            StringUtil.endWith(name, '7z') ||
            StringUtil.endWith(name, 'tar') ||
            StringUtil.endWith(name, 'tar') ||
            StringUtil.endWith(name, 'gz')
    }

    static CanPassUploadFormat(name: string | null): boolean {
        return FileUtil.isPpt(name) || FileUtil.isPdf(name)
            || FileUtil.isText(name) || FileUtil.isImage(name) || FileUtil.isDoc(name);
    }

    static GetIcon(name: string | null, idDir: boolean = false): any {
        if (idDir) {
            return folderSvg;
        }

        if (FileUtil.isPdf(name)) {
            return pdfSvg;
        } else if (FileUtil.isDoc(name)) {
            return docSvg;
        } else if (FileUtil.isPpt(name)) {
            return pptSvg;
        } else if (FileUtil.isXls(name)) {
            return xlsSvg;
        } else if (FileUtil.isAudio(name)) {
            return audioSvg;
        } else if (
            FileUtil.isVideo(name) ||
            path.extname(name) === '.mkv'
        ) {
            return videoSvg;
        } else if (FileUtil.isText(name)) {
            return textSvg;
        } else if (FileUtil.isPsd(name)) {
            return psdSvg;
        } else if (FileUtil.isImage(name)) {
            return imageSvg;
        } else if (FileUtil.isArchive(name)) {
            return archiveSvg;
        } else {
            return fileSvg;
        }
    }

    // 格式化文件大小显示
    static FormatFileSize(size: number): string {
        return size > 1024 ? size / 1024 > 1024 ? size / (1024 * 1024) > 1024 ? (size / (1024 * 1024 * 1024)).toFixed(2) + "GB"
            : (size / (1024 * 1024)).toFixed(2) + "MB" : (size / 1024).toFixed(2) + "KB" : size.toFixed(2) + "B";
    }

    static ExtensionName(name: string | null): string {
        return path.extname(name);
    }

    static FileExtensionNameFromBase64(base64Data: string): string | null {
        const parts = base64Data.split(",");
        if (parts.length !== 2) {
            console.error("Image data format error:", base64Data);
            return null;
        }

        const mimePart = parts[0].split(";")[0]; // 获取 "data:image/png"
        const mimeType = mimePart.split(":")[1]; // 获取 "image/png"

        if (mimeType) {
            return "." + mimeType.split("/")[1]; // 获取 "png"
        }
        return null;
    }

    static GetImageTextUrl(appId: string, url: string): string {
        // 找到最后一个斜杠的位置
        const lastSlashIndex = url.lastIndexOf('/');
        // 将 URL 分为两部分：路径和文件名
        if (lastSlashIndex !== -1) {
            const basePath = url.substring(0, lastSlashIndex + 1); // 包括最后一个斜杠之前的部分
            const filename = url.substring(lastSlashIndex + 1); // 最后一个斜杠之后的部分
            return basePath + FileUtil.getS3DirPath(appId, filename + ".txt");
        }
        return url
    }

    static FileName(name: string | null): string {
        return path.basename(name, path.extname(name));
    }

    static GetUniqueFileName(fileName: string, existingFiles: string[]): string {
        let name = fileName;
        let extension = '';
        const lastDotIndex = fileName.lastIndexOf('.');

        if (lastDotIndex !== -1) {
            name = fileName.substring(0, lastDotIndex);
            extension = fileName.substring(lastDotIndex);
        }

        let counter = 1;
        let newFileName = fileName;

        while (existingFiles.includes(newFileName)) {
            newFileName = `${name}(${counter})${extension}`;
            counter++;
        }

        return newFileName;
    }

    static GetPrefixBeforeDot(str: string): string {
        const dotIndex = str.indexOf('.'); // 获取第一个 '.' 的索引
        if (dotIndex === -1) {
            // 如果没有找到 '.', 返回整个字符串
            return str;
        }
        return str.substring(0, dotIndex); // 截取从起始位置到第一个 '.' 的子字符串
    }

    static ConvertFileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    resolve(reader.result as string); // 返回 Base64 字符串
                } else {
                    reject(new Error("文件读取失败"));
                }
            };
            reader.onerror = () => reject(new Error("文件读取时发生错误"));
            reader.readAsDataURL(file); // 将文件读取为 DataURL(Base64)
        });
    }

    static getS3DirPath(appId: string, fileName: string) {
        return appId + "/" + "kb_image" + "/" + fileName;
    }

    static StrToTextFile(content: string, fileName: string): File {
        // 创建一个 BlobPart 数组
        const blobParts: BlobPart[] = [content];
        // 创建一个 File 对象
        return new File(blobParts, fileName, {type: 'text/plain'});
    }

    static async TextFileToStr(url: string): Promise<string> {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch file: ${response.statusText}`);
            }
            return await response.text();
        } catch (error) {
            console.error(`Error reading text file: ${error}`);
            throw error;
        }
    }

    static downloadFile(url: string, filename: string): void {
        url += '?response-content-disposition=attachment';
        const link = document.createElement('a');
        link.href = url;
        // 设置下载的文件名
        link.download = filename;
        // link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        // 下载后移除 a 标签
        document.body.removeChild(link);
    }
}