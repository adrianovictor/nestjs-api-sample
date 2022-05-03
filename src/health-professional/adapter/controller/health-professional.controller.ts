import { HttpService } from '@nestjs/axios';
import {
  CallHandler,
  Controller,
  ExecutionContext,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NestInterceptor,
  Query,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { firstValueFrom, map, Observable } from 'rxjs';
//import { CreateHealthProfessionalDto } from '../../domain/dto/requests/create-health-professional.dto';
//import { HealthProfessionalInterfaceService } from '../../domain/service/health-professional-interface.service';

@Controller()
export class HealthProfessionalController {
  private logger = new Logger(HealthProfessionalController.name);

  constructor(
    //@Inject("HealthProfessionalInterfaceService") private professionalService: HealthProfessionalInterfaceService,
    @Inject('IUserApiService') private userApiConsumeService: IUserApiService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  public async getHello(@Query('id') id: string): Promise<string> {
    this.logger.log('tentando salvar os dados');
    console.log(id);
    //if (!id) {
    // const model = new CreateHealthProfessionalDto();

    // model.name = 'Adriano Victor';
    // model.email = 'adriano.victor@exemple.com';
    // model.phoneNumber = '';
    // model.cellPhone = '';

    // const dataResult = await this.professionalService.create(model);
    // this.logger.log(dataResult);

    //}

    //const result = await this.getData();
    //console.log(result);

    const result = await this.userApiConsumeService.loadUsers();
    //console.log(result);

    //const data = await this.professionalService.getById(id);
    //console.log(data);
    return 'Ok';
  }

  async getData(): Promise<any> {
    const result = await this.httpService.get('https://api.github.com/users');

    return firstValueFrom(result);
  }
}

export class User {
  public id: string;
  public name: string;
  public avatar: string;
  public type: string;
  public url: string;
  public githubUrl: string;

  constructor(
    name: string,
    avatar: string,
    type: string,
    url: string,
    urlGithub: string,
  ) {
    this.name = name;
    this.avatar = avatar;
    this.type = type;
    this.url = url;
    this.githubUrl = urlGithub;
  }

  public static create(
    name: string,
    avatar: string,
    type: string,
    url: string,
    urlGithub: string,
  ): User {
    return new User(name, avatar, type, url, urlGithub);
  }

  public setId(id: string): void {
    this.id = id;
  }
}

export abstract class ConsumeApiRepository<TId, TEntity> {
  private url: string;
  private httpService: HttpService;

  constructor(url: string, httpService: HttpService) {
    this.url = url;
    this.httpService = httpService;
  }

  protected abstract mapToEntity(data: any): TEntity;
  protected abstract mapToData(entity: TEntity): any;

  async getAll(): Promise<any> {
    return this.findByQuery({});
  }

  async getById(id: TId): Promise<any> {
    return this.findByQuery({});
  }

  async findByQuery(query: any): Promise<any> {
    try {
      const request = await this.httpService.get(this.url, { headers: { username: "", password: "" } });
      const result = firstValueFrom(request);

      if (result == null) {
        throw new HttpException('A resposta veio vazia', HttpStatus.NOT_FOUND);
      } else if ((await result).status === HttpStatus.OK) {
        return this.queryResponse(await result);
      }
    } catch (e) {
      if (e.isAxiosError && e.response) {
        const response = e.response;
        throw new HttpException(
          HttpException.createBody(response.data),
          response.status,
        );
      }

      throw e;
    }
  }

  queryResponse(response: any): any {
    const data = response.data;
    const result = [];

    if (!Array.isArray(data)) {
      throw new InternalServerErrorException(
        'Era esperado um array, mas o retorno foi um objeto único.',
      );
    }

    for (const element of data) {
      result.push(this.mapToEntity(element));
    }

    return result;
  }
}

export interface IUserApiRepository {
  getUsers(): Promise<User[]>;
}

@Injectable()
export class UserApiRepository
  extends ConsumeApiRepository<string, User>
  implements IUserApiRepository
{
  constructor(httpService: HttpService, configService: ConfigService) {
    super(configService.get<string>('external_api.githubUsers'), httpService);
  }

  protected mapToEntity(data: any): User {
    const { id, login, avatar_url, url, type, html_url } = data;
    const entity = User.create(login, avatar_url, type, url, html_url);

    entity.setId(id);

    return entity;
  }

  protected mapToData(entity: User) {
    throw new Error('Method not implemented.');
  }

  public async getUsers(): Promise<User[]> {
    return await this.getAll();
  }
}

export interface IUserApiService {
  loadUsers(): Promise<User[]>;
}

@Injectable()
export class UserApiService implements IUserApiService {
  constructor(
    @Inject('IUserApiRepository') private userRepository: IUserApiRepository,
  ) {}

  public async loadUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    context.getArgs().map(item => {
      if (item === "GET") {
        //axios.defaults.headers.common["Authorization"] = "bearer: applicattion/json";
        
      }
      //console.log(item.customHeaders);
    });

    return next.handle().pipe(
      map(data => {
        const req = context.switchToHttp().getRequest();
        //console.log(req);
        return data;
      })
    );
  }

}
