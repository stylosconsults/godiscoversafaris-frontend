// Sharing on social platform
export const facebookClick = (url) => {
    window.open(`https:www.facebook.com/sharer/sharer.php?u=${url}`,"_blank");
}

export const twitterClick = (url) => {
    window.open(`https://twitter.com/intent/tweet?text=${url}`,"_blank");
}

export const whatsappClick = (url) => {
    window.open(`https://wa.me/?text=${url}`,"_blank");
}

export const mailClick = (url) => {
    window.open(`mailto:?subject="HAAPA Book" &body=${url}`,"_blank");
}
