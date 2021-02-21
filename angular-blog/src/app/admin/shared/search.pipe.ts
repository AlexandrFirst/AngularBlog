import { Pipe, PipeTransform } from "@angular/core";
import { Post } from "src/app/shared/components/Interfaces";

@Pipe({
    name:'serachPosts'
})
export class SearhPipe implements PipeTransform
{
    transform(posts: Post[],search=''):Post[] {
        if(!search.trim())
        {
            return posts
        }

        return posts.filter(post=>{
            return post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        })
    }

}