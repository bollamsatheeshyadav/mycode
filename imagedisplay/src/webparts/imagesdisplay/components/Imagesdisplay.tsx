import * as React from "react";
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import styles from "./Imagesdisplay.module.scss";
import { IImagesdisplayProps } from "./IImagesdisplayProps";

// ⭐ Add slide interface
interface ISlide {
  text: string;
  url: string;
}

export default function Imagesdisplay(props: IImagesdisplayProps) {

  // ⭐ FIX the error: give type to state
  const [slides, setSlides] = React.useState<ISlide[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const sp = spfi().using(SPFx(props.context));

      const items = await sp.web.lists
        .getByTitle("StarAirBrand Images")
        .items.select("Title", "FileLeafRef", "File/ServerRelativeUrl")
        .expand("File")();

      // ⭐ Ensure mapped array matches ISlide[]
      const mapped: ISlide[] = items.map((item: any) => ({
        text: item.Title,
        url: item.File.ServerRelativeUrl,
      }));

      setSlides(mapped);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Auto slide
  React.useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides]);

  return (
    <div className={styles.sliderContainer}>
      {slides.length > 0 && (
        <>
          <div
            className={styles.slide}
            style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          >
            <div className={styles.caption}>{slides[currentIndex].text}</div>
          </div>

          <div className={styles.navButtons}>
            <button
              onClick={() =>
                setCurrentIndex(
                  currentIndex === 0 ? slides.length - 1 : currentIndex - 1
                )
              }
            >
              ❮
            </button>

            <button
              onClick={() =>
                setCurrentIndex((currentIndex + 1) % slides.length)
              }
            >
              ❯
            </button>
          </div>
        </>
      )}
    </div>
  );
}
