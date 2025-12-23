import * as React from "react";
import { IHomepageProps } from "./IHomepageProps";
import styles from "./Homepage.module.scss";

import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export default function Homepage(props: IHomepageProps) {
  const [images, setImages] = React.useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

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

      // Map items to ensure URL is correct
const imageData = items.map((item) => ({
  title: item.Title || item.FileLeafRef, // text from Title column
  url: item.File?.ServerRelativeUrl || `/sites/YourSite/StarAirBrand Images/${item.FileLeafRef}`, // file URL
}));


      setImages(imageData);
    } catch (e) {
      console.error("Error loading images:", e);
    }
  };

  // Auto slide
  React.useEffect(() => {
    if (images.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      nextImage();
    }, 2000);

    return () => clearInterval(interval);
  }, [images, isPaused]);

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div
      className={styles.sliderContainer}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button className={styles.prevBtn} onClick={prevImage}>❮</button>

      <div className={styles.slider}>
        {images.map((img, index) => (
          <div
            key={index}
            className={`${styles.slide} ${
              index === currentIndex ? styles.active : styles.inactive
            }`}
            style={{
              backgroundImage: `url(${img.url})`,
            }}
          >
            <div className={styles.titleText}>{img.title}</div>
          </div>
        ))}
      </div>

      <button className={styles.nextBtn} onClick={nextImage}>❯</button>
    </div>
  );
}
