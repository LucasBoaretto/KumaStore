import { CImage } from "@coreui/react";

const MiniCardDetails = ({
    img,
    altText,
    onSelect,
    selected
}) => {
    return (
        <div
            onClick={() => onSelect(img)}
            className="me-2 mb-2"
            style={{
                cursor: "pointer",
                border: selected
                    ? "2px solid #5a6e00"
                    : "1px solid #ddd",
                borderRadius: "8px",
                padding: "4px",
                transition: ".2s"
            }}
        >
            <CImage
                src={img}
                alt={altText}
                width={90}
                height={90}
                style={{
                    objectFit: "cover"
                }}
            />
        </div>
    );
};

export default MiniCardDetails;