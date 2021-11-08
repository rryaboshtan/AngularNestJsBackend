import { Injectable } from "@nestjs/common";
import { MenuNode, PatchMenuNode } from "./menu-node";

@Injectable()
export class MenuService {

    /**
     * 
     */
    getMenu(): MenuNode[] {
        return [];
    }

    add(...nodes: MenuNode[]): void {
         
    }

    patch(...nodes: PatchMenuNode[]): void {

    }

    remove(...ids: string[]): void {
        
    }
}