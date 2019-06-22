import { Connection, Repository } from 'typeorm';
import { Atricle } from 'server/src/models/article.model';
import { Category } from 'server/src/models/category.model';
import { ArticleNamespace } from 'share';

const category: ArticleNamespace.ICategory = {
    name: 'Test',
    description: 'This is test category',
    route: 'test',
};

const article: Partial<ArticleNamespace.IArticle> = {
    categoryId: 1,
    description: 'This is article create for test',
    route: 'test-article',
    title: 'Test article',
    content: 'You will like those projects!\
    ---\
    \
    # h1 Heading 8-)\
    ## h2 Heading\
    ### h3 Heading\
    #### h4 Heading\
    ##### h5 Heading\
    ###### h6 Heading\
    ',
};

export async function initTestData(connection: Connection): Promise<void> {
    if (process.env.NODE_ENV === 'dev') {
        try {
            const categoryRep: Repository<Category> = connection.getRepository(Category);
            const articleRep: Repository<Atricle> = connection.getRepository(Atricle);
            const categoryRes = await categoryRep.find({ take: 1 });
            if (!categoryRes.length) {
                const categoryIns = categoryRep.create(category);
                const articleIns = articleRep.create({
                    ...article,
                    author: 1,
                });
                await categoryRep.insert(categoryIns);
                await articleRep.insert(articleIns);
            }
        } catch (err) {
            throw new Error(`Init test data failed =( \n ${err}`);
        }

    }
}
