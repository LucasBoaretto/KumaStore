import { CCarousel, CCarouselCaption, CCarouselItem, CImage } from "@coreui/react"

const DefaultBanner = ({ items }) => {
    return (
        <CCarousel controls indicators interval={15000} transition="crossfade" className="w-100">
            {items.map((item, index) => (
                <CCarouselItem key={index}>
                    <CImage
                        className="d-block w-100"
                        src={item.picture}
                        alt={`slide ${index}`}
                        style={{
                            height: '250px',
                            objectFit: 'fill'
                        }}
                    />
                    {item.title && (
                        <CCarouselCaption className="d-none d-md-block">
                            <h5>{item.title}</h5>
                        </CCarouselCaption>
                    )}
                </CCarouselItem>
            ))}
        </CCarousel>
    )
}

export default DefaultBanner