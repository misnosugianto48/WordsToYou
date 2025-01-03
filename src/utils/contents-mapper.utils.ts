import { Content } from 'prisma/prisma-client';

export const mapContentResponse = (content: Content): object => {
  return {
    id: content.id,
    title: content.title,
    recipientName: content.recipient_name,
    wordSent: content.word_sent,
    createdAt: content.created_at,
    updatedAt: content.updated_at,
  };
};

export const mapContentResponses = (contents: Content[]): object[] => {
  return contents.map((content) => mapContentResponse(content));
};
