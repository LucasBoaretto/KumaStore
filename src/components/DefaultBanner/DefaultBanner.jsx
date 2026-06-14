import {
    CCarousel,
    CCarouselCaption,
    CCarouselItem,
    CImage
} from "@coreui/react"

const DefaultBanner = ({ items }) => {
    return (
        <CCarousel
            controls
            indicators
            interval={15000}
            transition="crossfade"
            className="w-100 rounded overflow-hidden shadow-sm"
        >
            {items.map((item, index) => (
                <CCarouselItem key={index}>
                    <CImage
                        className="d-block w-100"
                        src={item.picture}
                        alt={`slide-${index}`}
                        style={{
                            height: "350px",
                            objectFit: "cover"
                        }}
                    />

                    {item.title && (
                        <CCarouselCaption className="d-none d-md-block">
                            <h3>{item.title}</h3>
                        </CCarouselCaption>
                    )}
                </CCarouselItem>
            ))}
        </CCarousel>
    )
}

export default DefaultBanner