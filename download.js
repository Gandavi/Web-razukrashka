document.getElementById('downloadButton').addEventListener('click', function() {
    // Получаем элемент SVG
    const svg = document.querySelector('svg');

    // Преобразуем содержимое элемента SVG в строку
    let svgData = new XMLSerializer().serializeToString(svg);

    // Создаем Blob объект для хранения данных файла
    const blob = new Blob([svgData], { type: 'image/svg+xml' });

    // Генерируем ссылку для скачивания
    const downloadLink = window.URL.createObjectURL(blob);

    // Создаем временную ссылку для начала процесса скачивания
    const tempLink = document.createElement('a');
    tempLink.href = downloadLink;
    tempLink.download = 'example.svg';
    tempLink.click();

    // Освобождаем ресурсы после завершения операции
    setTimeout(() => {
        window.URL.revokeObjectURL(downloadLink);
    }, 100);
});
