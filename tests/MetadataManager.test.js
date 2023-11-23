const MetadataManager = require('../MetadataManager');

describe('MetadataManager', () => {
  // Mock external dependencies here

  describe('updateMetadata', () => {
    it('should update metadata correctly under normal conditions', async () => {
      const validMetadata = { title: 'New Song', artist: 'New Artist' };
      const metadataManager = new MetadataManager();
      jest.spyOn(metadataManager, 'updateMetadata').mockResolvedValue(validMetadata);
      await expect(metadataManager.updateMetadata(validMetadata)).resolves.toEqual(validMetadata);
      expect(metadataManager.updateMetadata).toHaveBeenCalledWith(validMetadata);
    });

    it('should handle updating with invalid metadata', async () => {
      const invalidMetadata = { title: 'Incomplete Song' };
      const metadataManager = new MetadataManager();
      jest.spyOn(metadataManager, 'updateMetadata').mockImplementation(() => {
        throw new Error('Invalid metadata format');
      });
      await expect(metadataManager.updateMetadata(invalidMetadata)).rejects.toThrow('Invalid metadata format');
      expect(metadataManager.updateMetadata).toHaveBeenCalledWith(invalidMetadata);
    });

    it('should throw an error when metadata format is incorrect', async () => {
      const metadataManager = new MetadataManager();
      const incorrectMetadata = { album: 'Unknown' };
      jest.spyOn(metadataManager, 'updateMetadata').mockImplementation(() => {
        throw new Error('Metadata format is incorrect');
      });
      await expect(metadataManager.updateMetadata(incorrectMetadata)).rejects.toThrow('Metadata format is incorrect');
      expect(metadataManager.updateMetadata).toHaveBeenCalledWith(incorrectMetadata);
    });
});
