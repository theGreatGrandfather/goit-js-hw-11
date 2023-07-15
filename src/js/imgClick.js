

export const onImgClick = (e) => {
    
    e.preventDefault();
    console.log('e', e.target)
    
    if (e.target.nodeName === 'IMG'){ 
        const instance  = basicLightbox.create(`
            <img src="${e.target.dataset.source}">
        `,
        {
            onShow: (instance ) => {
                document.addEventListener("keydown", onEscapeKeydowm);
            },
            onClose: (instance ) => {
                document.removeEventListener("keydown", onEscapeKeydowm);
            },
        }
        );
        instance.show();

        function onEscapeKeydowm(e) {
            if (e.code === "Escape") {
                console.log('e', e)
                instance.close();
            }
        };
    };
};

