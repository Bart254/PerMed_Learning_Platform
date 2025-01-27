import dbClient from '../utils/db';

export default class ContentHandler {
  static async getArticlesByTopics(req, res) {
    try {
      const user = await dbClient.db.collection('users').findOne({ _id: req.userId });
      if (!user || !user.selectedTopics.length) {
        return res.status(400).json({ error: 'No topics selected. Please select topics first.' });
      }

      const articles = await dbClient.db.collection('articles')
        .find({ topic: { $in: user.selectedTopics } }).toArray();

      return res.json({ success: true, articles });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getVideosByTopics(req, res) {
    try {
      const user = await dbClient.db.collection('users').findOne({ _id: req.userId });
      if (!user || !user.selectedTopics.length) {
        return res.status(400).json({ error: 'No topics selected. Please select topics first.' });
      }

      const videos = await dbClient.db.collection('videos')
        .find({ topic: { $in: user.selectedTopics } }).toArray();
			console.log(videos);

      return res.json({ success: true, videos });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
