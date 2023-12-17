export default function CustomImage({ imgSrc, pt }) {
  //custom image for improve skill section
  return (
    <div className="custom-image" style={{ paddingTop: pt }}>
      <img src={imgSrc} alt="" />
    </div>
  );
}
