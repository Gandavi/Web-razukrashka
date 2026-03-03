// Функция для сохранения SVG + background в виде PNG
async function convertSVGtoPNGWithBackground(svgElement, backgroundSrc) {
    return new Promise((resolve, reject) => {
        try {
            // Загружаем изображение фона
            const bgImg = new Image();
            bgImg.src = backgroundSrc;
            bgImg.crossOrigin = 'anonymous'; // Если картинка расположена на другом домене

            // Ждем пока оба изображения будут готовы
            bgImg.onload = async () => {
                // Конвертирование SVG в dataURI
                const serializer = new XMLSerializer();
                const svgContent = serializer.serializeToString(svgElement);

                // Создаем временное canvas
                const canvas = document.createElement("canvas");
                canvas.width = Math.max(bgImg.naturalWidth, svgElement.clientWidth);
                canvas.height = Math.max(bgImg.naturalHeight, svgElement.clientHeight);

                // Контекст для рисования
                const ctx = canvas.getContext("2d");

                // Рисуем фоновое изображение
                ctx.drawImage(bgImg, 0, 0);

                // Затем рисуем сверху SVG
                const img = new Image();
                img.onload = () => {
                    ctx.drawImage(img, 0, 0);
                    
                    // Сохраняем картинку как PNG
                    resolve(canvas.toDataURL("image/png"));
                };
                img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;
            };
        } catch(err) {
            reject(err);
        }
    });
}

// Обработчик нажатия кнопки
document.getElementById('convertAndDownloadButton').addEventListener('click', async () => {
    const svgElement = document.getElementById('drawing');
    const backgroundSrc = document.getElementById('backgroundImg').src;

    if (!svgElement || !backgroundSrc) return alert('Элементы SVG или фоновая картинка отсутствуют.');

    try {
        const dataUrl = await convertSVGtoPNGWithBackground(svgElement, backgroundSrc);
        
        // Генерация ссылки для скачивания
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'output.png'; // Имя загружаемого файла
        link.click(); // Начинаем загрузку
    } catch(e) {
        console.error(e); // Логируем ошибку
    }
});
