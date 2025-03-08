import singleton from "../singleton";

describe("singleton 函数测试", () => {
  test("使用 singleton 装饰的类应该返回相同实例", () => {
    // 创建一个简单的测试类
    class TestClass {
      public value: number;
      
      constructor(value: number = 0) {
        this.value = value;
      }
    }
    
    // 使用 singleton 装饰器
    const SingletonTestClass = singleton(TestClass);
    
    // 创建两个实例
    const instance1 = new SingletonTestClass(1);
    const instance2 = new SingletonTestClass(2); // 第二次传入的参数应该被忽略
    
    // 验证两个实例是同一个对象
    expect(instance1).toBe(instance2);
    
    // 验证实例的值是第一次创建时设置的值
    expect(instance1.value).toBe(1);
    expect(instance2.value).toBe(1); // 不是2，因为第二次创建时应该返回第一次的实例
  });
  
  test("不同类的单例应该互不影响", () => {
    class ClassA {
      public name: string = "A";
    }
    
    class ClassB {
      public name: string = "B";
    }
    
    const SingletonA = singleton(ClassA);
    const SingletonB = singleton(ClassB);
    
    const instanceA1 = new SingletonA();
    const instanceA2 = new SingletonA();
    const instanceB1 = new SingletonB();
    const instanceB2 = new SingletonB();
    
    // 同一个类的实例应该相同
    expect(instanceA1).toBe(instanceA2);
    expect(instanceB1).toBe(instanceB2);
    
    // 不同类的实例应该不同
    expect(instanceA1).not.toBe(instanceB1);
    
    // 验证实例类型和属性
    expect(instanceA1.name).toBe("A");
    expect(instanceB1.name).toBe("B");
  });
  
  test("单例类的 constructor 应该指向代理类", () => {
    class TestClass {}
    const SingletonTestClass = singleton(TestClass);
    
    // 验证原型链上的 constructor 指向代理类
    expect(TestClass.prototype.constructor).toBe(SingletonTestClass);
    
    // 创建实例并验证 constructor
    const instance = new SingletonTestClass();
    expect(instance.constructor).toBe(SingletonTestClass);
  });
  
  test("单例类应该保持原始类的实例类型", () => {
    class TestClass {}
    const SingletonTestClass = singleton(TestClass);
    
    const instance = new SingletonTestClass();
    
    // 验证实例是原始类的实例
    expect(instance instanceof TestClass).toBe(true);
  });
  
  test("单例类应该正确传递构造函数参数", () => {
    class Person {
      public name: string;
      public age: number;
      
      constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
      }
    }
    
    const SingletonPerson = singleton(Person);
    
    // 第一次创建时传入参数
    const person1 = new SingletonPerson("张三", 25);
    
    // 第二次创建时传入不同参数，但应该返回第一次创建的实例
    const person2 = new SingletonPerson("李四", 30);
    
    // 验证两个实例是同一个对象
    expect(person1).toBe(person2);
    
    // 验证实例的属性是第一次创建时设置的值
    expect(person1.name).toBe("张三");
    expect(person1.age).toBe(25);
    expect(person2.name).toBe("张三"); // 不是"李四"
    expect(person2.age).toBe(25); // 不是30
  });
});