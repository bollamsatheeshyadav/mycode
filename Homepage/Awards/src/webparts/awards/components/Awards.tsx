import * as React from "react";
import { IAwardsProps } from "./IAwardsProps";
import styles from "./Awards.module.scss";

import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/lists";

interface IAwardsState {
  items: any[];
  previewImage: string;
  hoverIndex: number;
  mouseX: number;
  mouseY: number;
}

export default class Awards extends React.Component<IAwardsProps, IAwardsState> {
  private _sp = spfi().using(SPFx(this.props.context));

  constructor(props: IAwardsProps) {
    super(props);
    this.state = {
      items: [],
      previewImage: "",
      hoverIndex: -1,
      mouseX: 0,
      mouseY: 0
    };
  }

  public componentDidMount(): void {
    this.loadFiles();
  }

  private async loadFiles() {
    try {
      const files = await this._sp.web.lists
        .getByTitle("mediacontent")
        .items.select(
          "File/Name",
          "File/ServerRelativeUrl",
          "Created",
          "Author/Title"
        )
        .expand("File", "Author")();

      const formatted = files.map((f: any) => ({
        Name: f.File?.Name,
        Url: f.File?.ServerRelativeUrl,
        Created: f.Created,
        CreatedBy: f.Author?.Title
      }));

      this.setState({ items: formatted });
    } catch (error) {
      console.error("Error loading files:", error);
    }
  }

  private getFileType(fileName: string): string {
    if (!fileName) return "";
    const parts = fileName.split(".");
    return parts.length > 1 ? (parts.pop() || "").toLowerCase() : "";
  }

  private openInNewWindow(url: string) {
    const fullUrl = `${url}?web=1`;
    window.open(fullUrl, "_blank");
  }

  public render(): React.ReactElement<IAwardsProps> {
    const { items, previewImage, hoverIndex, mouseX, mouseY } = this.state;

    const imageTypes = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    const videoTypes = ["mp4", "mov", "wmv", "webm"];

    return (
      <section className={styles.wrapper}>

        {/* FLOATING HOVER PREVIEW */}
        {previewImage && (
          <div
            className={styles.previewBox}
            style={{
              backgroundImage: `url(${previewImage})`,
              top: mouseY + 15,
              left: mouseX + 15
            }}
          />
        )}

        <h2 className={styles.heading}>Media Content</h2>

        <table className={styles.mediaTable}>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Created</th>
              <th>Created By</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item: any, index: number) => {
              const fileType = this.getFileType(item.Name);

              return (
                <tr
                  key={index}
                  className={
                    hoverIndex === -1
                      ? styles.normalRow
                      : hoverIndex === index
                      ? styles.activeRow
                      : styles.fadedRow
                  }
                  onMouseEnter={(e) => {
                    this.setState({
                      hoverIndex: index,
                      mouseX: e.clientX,
                      mouseY: e.clientY
                    });

                    if (imageTypes.includes(fileType)) {
                      this.setState({ previewImage: item.Url });
                    }
                  }}
                  onMouseMove={(e) => {
                    this.setState({
                      mouseX: e.clientX,
                      mouseY: e.clientY
                    });
                  }}
                  onMouseLeave={() =>
                    this.setState({
                      hoverIndex: -1,
                      previewImage: "",
                      mouseX: 0,
                      mouseY: 0
                    })
                  }
                >
                  <td className={styles.fileTitle}>{item.Name}</td>
                  <td>{new Date(item.Created).toLocaleDateString()}</td>
                  <td>{item.CreatedBy}</td>

                  <td>
                    <button
                      className={styles.viewBtn}
                      onClick={() => this.openInNewWindow(item.Url)}
                    >
                      {videoTypes.includes(fileType)
                        ? "Play Video"
                        : fileType === "pdf"
                        ? "Open PDF"
                        : ["doc", "docx"].includes(fileType)
                        ? "Open Word"
                        : ["ppt", "pptx"].includes(fileType)
                        ? "Open PPT"
                        : ["xls", "xlsx"].includes(fileType)
                        ? "Open Excel"
                        : "View"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    );
  }
}
