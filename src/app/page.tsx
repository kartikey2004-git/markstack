import { TopNav } from "@/components/layout/top-nav";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  PenTool,
  TrendingUp,
  Calendar,
  ArrowRight,
  Plus,
  BarChart3,
  Users,
  Clock,
  Edit3,
  Eye,
  Save,
  FolderOpen,
  ChevronDown,
} from "lucide-react";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

async function getBlogStats() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/blogs`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return { totalBlogs: 0, allBlogs: [] };
    }

    const data = await response.json();
    const blogs = data.blogs || [];

    return {
      totalBlogs: blogs.length,
      allBlogs: blogs as BlogPost[],
    };
  } catch (error) {
    console.error("Error fetching blog stats:", error);
    return { totalBlogs: 0, allBlogs: [] };
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default async function Dashboard() {
  const { totalBlogs, allBlogs } = await getBlogStats();

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <Hero />
        <Features />
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-0 shadow-sm bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBlogs}</div>
              <p className="text-xs text-muted-foreground">Published pieces</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Activity</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {allBlogs.length > 0 ? "Active" : "None"}
              </div>
              <p className="text-xs text-muted-foreground">Recent activity</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  allBlogs.filter((blog: BlogPost) => {
                    const blogDate = new Date(blog.createdAt);
                    const now = new Date();
                    return (
                      blogDate.getMonth() === now.getMonth() &&
                      blogDate.getFullYear() === now.getFullYear()
                    );
                  }).length
                }
              </div>
              <p className="text-xs text-muted-foreground">Pieces this month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Engagement</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground">
                Views & interactions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* All Blog Posts */}
        <section id="blogs" className="space-y-6 scroll-mt-20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                All Blog Posts
              </h2>
              <p className="text-muted-foreground mt-1">
                {allBlogs.length} {allBlogs.length === 1 ? "post" : "posts"}{" "}
                published
              </p>
            </div>
          </div>

          {allBlogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-6">
              <div className="relative">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                  <FileText className="w-12 h-12 text-muted-foreground" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Plus className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
              <div className="text-center space-y-2 max-w-md">
                <h3 className="text-2xl font-semibold">No blog posts yet</h3>
                <p className="text-muted-foreground">
                  Start your blogging journey by creating your first blog post.
                </p>
                <Link href="/editor">
                  <Button size="lg" className="mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Write Your First Blog Post
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {allBlogs.map((blog: BlogPost) => (
                <Card
                  key={blog.slug}
                  className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-0 shadow-sm bg-card/50 backdrop-blur-sm"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <Badge variant="secondary" className="text-xs">
                        Blog
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />5 min read
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">
                      {blog.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-sm">
                      {blog.description || "No description provided"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(blog.createdAt)}
                      </div>
                      <Link href={`/blog/${blog.slug}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 hover:bg-primary/10"
                        >
                          Read
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* FAQ Section */}
        <FAQ />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
