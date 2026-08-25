const { handleUpload } = require('@vercel/blob/client');

module.exports = async function handler(request, response) {
  const body = request.body;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
          addRandomSuffix: true,
          maximumSizeInBytes: 15 * 1024 * 1024, // 15MB üst sınır
        };
      },
      onUploadCompleted: async () => {
        // İsteğe bağlı: yükleme tamamlandığında burada loglama yapılabilir.
      },
    });

    return response.status(200).json(jsonResponse);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
};
