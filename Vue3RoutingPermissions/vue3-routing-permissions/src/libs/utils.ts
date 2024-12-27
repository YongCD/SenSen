// import type { IRoute } from "@/types"
// /**
//  * 格式化路由树
//  * @param routeList 路由列表
//  * @returns 格式化后的父级路由列表
//  */
// export function formatRouteTree (routeList: IRoute[]) {
//   // 筛选出父级路由（顶级路由）
//   const parents = routeList.filter(item => item.pid === 0)

//   // 筛选出子级路由
//   const children = routeList.filter(item => item.pid !== 0)

//   // 构建路由树结构
//   dataToTree(parents, children)

//   // 返回格式化后的父级路由列表
//   return parents

//   /**
//    * 递归构建路由树
//    * @param parents 父级路由列表
//    * @param children 子级路由列表
//    */
//   function dataToTree (parents: IRoute[], children: IRoute[]) {
//     // 遍历父级路由
//     parents.forEach(parent => {
//       // 遍历子级路由
//       children.forEach((child, index) => {
//         // 复制子级路由列表，避免原地修改
//         const _children: IRoute[] = JSON.parse(JSON.stringify(children))
//         // 移除当前子路由，以处理下一级子路由
//         _children.splice(index, 1)
//         // 递归构建下一级路由树
//         dataToTree([child], _children)

//         // 如果当前父路由是当前子路由的父级
//         if (parent.id === child.pid) {
//           // 如果父路由已有子路由列表，则将当前子路由添加到列表中
//           if (parent.children) {
//             parent.children.push(child)
//           } else {
//             // 否则，创建子路由列表
//             parent.children = [child]
//           }
//         }
//       })
//     })
//   }
// }



// import type { IRoute } from "@/types";
// /**
//  * 格式化路由树
//  * @param routeList 路由列表
//  * @returns 格式化后的父级路由列表
//  */
// export function formatRouteTree(routeList: IRoute[]): IRoute[] {
//   // 验证输入参数
//   if (!Array.isArray(routeList)) {
//     throw new Error("routeList must be an array");
//   }

//   // 创建一个映射表，用于快速查找父级路由
//   const idMap = new Map<number, IRoute>();
//   routeList.forEach(item => {
//     if (typeof item.id !== 'number' || typeof item.pid !== 'number') {
//       throw new Error("Each route item must have valid id and pid properties"); 
//     }
//     idMap.set(item.id, item);
//     console.log('idMap', idMap)
//   });

//   // 筛选出父级路由（顶级路由）
//   const parents: IRoute[] = [];
//   const children: IRoute[] = [];

//   routeList.forEach(item => {
//     if (item.pid === 0) {
//       parents.push(item);
//     } else {
//       children.push(item);
//     }
//   });

//   // 构建路由树结构
//   dataToTree(parents, children, idMap);

//   // 返回格式化后的父级路由列表
//   return parents;
// }

// /**
//  * 递归构建路由树
//  * @param parents 父级路由列表
//  * @param children 子级路由列表
//  * @param idMap 路由ID映射表
//  */
// function dataToTree(parents: IRoute[], children: IRoute[], idMap: Map<number, IRoute>) {
//   parents.forEach(parent => {
//     children.forEach(child => {
//       if (parent.id === child.pid) {
//         if (parent.children) {
//           parent.children.push(child);
//         } else {
//           parent.children = [child];
//         }
//         // 递归处理下一级子路由
//         dataToTree([child], children, idMap);
//       }
//     });
//   });
// }



import type { IRoute } from "@/types";
/**
 * 格式化路由树
 * @param routeList 路由列表
 * @returns 格式化后的父级路由列表
 */
export function formatRouteTree(routeList: IRoute[]): IRoute[] {
  // 验证输入参数
  if (!Array.isArray(routeList)) {
    throw new Error("routeList must be an array");
  }

  // 创建一个映射表，用于快速查找父级路由
  const idMap = new Map<number, IRoute>();
  routeList.forEach(item => {
    if (typeof item.id !== 'number' || typeof item.pid !== 'number') {
      throw new Error("Each route item must have valid id and pid properties");
    }
    idMap.set(item.id, item);
  });

  // 筛选出父级路由（顶级路由）
  const parents: IRoute[] = routeList.filter(item => item.pid === 0);

  // 构建路由树结构
  routeList.forEach(child => {
    if (child.pid !== 0) {
      const parent = idMap.get(child.pid);
      if (parent) {
        if (parent.children) {
          parent.children.push(child);
        } else {
          parent.children = [child];
        }
      }
    }
  });

  // 返回格式化后的父级路由列表
  return parents;
}