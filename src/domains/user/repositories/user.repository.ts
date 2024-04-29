import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { User } from "../../../entities";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly dataSource: DataSource
  ) {}

  //로그인 토큰 업데이트
  async update(userId: number, token: string) {
    try {
      const { raw } = await this.dataSource.getRepository(User).update(
        {
          id: userId,
        },
        {
          accessToken: token,
        }
      );

      return raw;
    } catch (error) {
      return error;
    }
  }

  async load(accId: string) {
    const entityManager = this.dataSource.manager;
    // query need change!!!
    const result = await entityManager.query(
      `
        SELECT
            SC.nano_id AS spaceId,
            SC.name AS name,
            SC.description AS description,
            SCO.attribute AS attribute
        FROM TB_SPACE AS SC
        JOIN TB_SPACE_OBJECT SCO ON SCO.space_id = SC.nano_id 
        WHERE SC.creator_id = ? LIMIT 1;
      `,
      [accId]
    );
    return result;
  }

  async findAll(accId: string) {
    const entityManager = this.dataSource.manager;
    // query need change!!!
    const result = await entityManager.query(
      `
        SELECT
            SC.nano_id AS spaceId,
            SC.name AS name,
            SC.description AS description,
            SCO.attribute AS attribute
        FROM TB_SPACE AS SC
        JOIN TB_SPACE_OBJECT SCO ON SCO.space_id = SC.nano_id 
        WHERE SC.creator_id = ? LIMIT 1;
      `,
      [accId]
    );
    return result;
  }

  async category() {
    const entityManager = this.dataSource.manager;
    // query need change!!!
    const result = await entityManager.query(
      `
        SELECT 
          cate.nanoid AS id, 
          cate.id AS subcategory, 
          cate.name, 
          cate.description,
          cate.depth, 
          parent.nanoid AS parent_id,
          cate.thumbnail AS icon,
          cate.type, 
          UNIX_TIMESTAMP(cate.update_at) * 1000 AS upAt
        FROM 
          TB_SPACE_CATEGORY AS cate
        LEFT JOIN 
          TB_SPACE_CATEGORY AS parent 
        ON 
          cate.parent_id = parent.nanoid
        WHERE cate.deleted = 0 AND cate.is_show = 1;
      `
    );
    return result;
  }

  async checkToken(token: string): Promise<User | null> {
    const raw = await this.dataSource.getRepository(User).findOne({
      select: ["id", "accessToken"],
      where: {
        accessToken: token,
      },
      order: {
        id: "ASC",
      },
    });
    return raw;
  }
}
