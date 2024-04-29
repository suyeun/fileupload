# NestJS Template

```javascript
root
├─ src
│  ├─ app.module.ts
│  ├─ app.service.ts
│  ├─ bootstrap.ts
│  ├─ boards
│  │  ├─ board.entity.ts
│  │  ├─ boards.module.ts
│  │  ├─ boards.service.ts
│  │  ├─ boards.controller.ts
│  │  └─ boards.repository.ts
│  ├─ users
│  │  ├─ user.entity.ts
│  │  ├─ users.module.ts
│  │  ├─ users.service.ts
│  │  ├─ users.controller.ts
│  │  └─ users.repository.ts
│  └─ shared
│     └─ authorization.filter.ts
```

custom exception usage :

```typescript
    @Get() // default "user/" path
    @UseFilters(new HttpExceptionFilter())
    getHelloWorld(): string {
        return this.userService.getHelloWorld();
    }
```
