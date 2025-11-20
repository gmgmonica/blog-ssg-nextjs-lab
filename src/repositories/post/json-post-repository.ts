import { PostModel } from '../../models/post/post-model';
import { PostRepository } from './post-repository';
import { resolve } from 'path';
import { readFile } from 'fs/promises';

const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(
  ROOT_DIR,
  'src',
  'db',
  'seed',
  'posts.json',
);
export class JsonPostRepository implements PostRepository {
  private async readFromDisk(): Promise<PostModel[]> {
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, 'utf-8');
    const parsedJson = JSON.parse(jsonContent);
    const { posts } = parsedJson;
    return posts;
  }

  async findAll(): Promise<PostModel[]> {
     return this.readFromDisk();
  }

  async findById(id: string): Promise<PostModel> {
    const posts = await this.findAll();
    const post = posts.find(post => post.id === id);

    if (!post) throw new Error('Post não encontrado para ID');

    return post;
  }
}

export const postRepository: PostRepository = new JsonPostRepository();

// Exemplo
(async () => {
  const posts = await postRepository.findAll();
  posts.forEach(post => {
    console.log(post.id);
  })

  const postId = await postRepository.findById('76396dd3-9581-43b5-856d-fe1a78714e8c');
  console.log(postId);
})();
