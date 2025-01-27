import dbClient from '../utils/db';

export default class TopicsHandler {
  static async addTopic(req, res) {
    const { topic } = req.body;

    try {
      const user = await dbClient.db.collection('users').findOne({ _id: req.userId });

      // Check if the topic is already selected
      if (user.selectedTopics.includes(topic)) {
        return res.status(400).json({ error: 'Topic already selected' });
      }

      await dbClient.db.collection('users')
        .updateOne(
          { _id: req.userId },
          { $push: { selectedTopics: { $each: topic } } },
        );

      return res.json({ msg: 'Topic added successfully', selectedTopics: user.selectedTopics });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteTopic(req, res) {
    const { topic } = req.body;

    try {
      await dbClient.db.collection('users')
        .updateOne(
          { _id: req.userId },
          { $pull: { selectedTopics: topic } },
        );

      return res.json({ msg: 'Topic removed successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getTopics(req, res) {
    try {
      const user = await dbClient.db.collection('users').findOne({ _id: req.userId });
      return res.json({ selectedTopics: user.selectedTopics });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getAllTopics(req, res) {
    try {
      const topics = await dbClient.db.collection('topics').find({}).toArray();
      return res.json({ success: true, topics: topics.map(topic => topic.name) });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
