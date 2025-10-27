import { ImageResponse } from '@vercel/og';
import React from 'react';

/**
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
const handler = async (req, res) => {
  try {
    const { title, subtitle, image } = req.query;

    const titleText = decodeURIComponent(title ?? '우리 결혼해요 💍');
    const subText = decodeURIComponent(subtitle ?? '초대합니다');
    const imageUrl = image ? decodeURIComponent(image) : null;

    const imageResponse = new ImageResponse(
      React.createElement(
        'div',
        {
          style: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FAF7F2',
            backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            textAlign: 'center',
            fontFamily: 'Pretendard, sans-serif',
            color: '#333',
            padding: '0 40px',
          },
        },
        React.createElement(
          'div',
          {
            style: {
              fontSize: 64,
              fontWeight: 700,
              color: imageUrl ? 'white' : '#222',
              textShadow: imageUrl ? '2px 2px 6px rgba(0,0,0,0.4)' : 'none',
            },
          },
          titleText,
        ),
        React.createElement(
          'div',
          {
            style: {
              fontSize: 32,
              color: imageUrl ? 'rgba(255,255,255,0.9)' : '#555',
              marginTop: 12,
              textShadow: imageUrl ? '1px 1px 3px rgba(0,0,0,0.3)' : 'none',
            },
          },
          subText,
        ),
      ),
      { width: 800, height: 400 },
    );

    const buffer = Buffer.from(await imageResponse.arrayBuffer());
    res.setHeader('Content-Type', 'image/png');
    res.status(200).end(buffer);
  } catch (err) {
    console.error('OG_IMAGE_ERROR', err);
    res
      .status(500)
      .json({ error: 'og_generation_failed', message: err.message });
  }
};

export default handler;
