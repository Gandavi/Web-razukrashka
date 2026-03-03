// Функция для сохранения SVG в виде PNG
async function convertSVGtoPNG(svgElement) {
    return new Promise((resolve, reject) => {
        try {
            // Конвертирование SVG в dataURI
            const serializer = new XMLSerializer();
            const svgContent = serializer.serializeToString(svgElement);
            
            // Создание временного canvas
            const canvas = document.createElement("canvas");
            canvas.width = svgElement.clientWidth;
            canvas.height = svgElement.clientHeight;
        
            // Извлекаем рендеринг SVG на холсте
            const ctx = canvas.getContext("2d");
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0);
                
                // Сохраняем картинку как PNG
                resolve(canvas.toDataURL("image/png"));
            };
            img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;
        } catch(err) {
            reject(err);
        }
    });
}

// Обработчик нажатия кнопки
document.getElementById('convertAndDownloadButton').addEventListener('click', async () => {
    const svgElement = document.getElementById('mySvg');
    if (!svgElement) return alert('Элемент SVG не найден!');

    try {
        const dataUrl = await convertSVGtoPNG(svgElement);
        
        // Генерация ссылки для скачивания
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'output.png'; // Имя загружаемого файла
        link.click(); // Начинаем загрузку
    } catch(e) {
        console.error(e); // Логируем ошибку
    }
});
