import { Content } from 'prisma/prisma-client';
import { ContentEntity } from 'src/contents/entities/content.entity';

export const mapContentResponse = (content: Content): ContentEntity => {
  return {
    id: content.id,
    recipientName: content.recipient_name,
    wordSent: content.word_sent,
    createdAt: content.created_at,
    updatedAt: content.updated_at,
  };
};

export const mapContentResponses = (contents: Content[]): ContentEntity[] => {
  return contents.map((content) => mapContentResponse(content));
};
