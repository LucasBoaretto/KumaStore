import { CImage } from "@coreui/react"

const MiniCardDetails = ({ img, altText }) => {
    return (
        <div className="mx-1 border p-1" style={{ cursor: 'pointer' }}>
            <CImage
                src={img}
                alt={altText}
                width={100}
                height={100}
            />
        </div>
    )
}

export default MiniCardDetails